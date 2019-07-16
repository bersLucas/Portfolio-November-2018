const babel = require('@babel/core');
const sass = require('sass');
const pug = require('pug');
const fs = require('fs').promises;
const path = require('path');
const { inlineSource } = require('inline-source');

const transpileJS = files => Promise.all(
  files.map(file => babel.transformFileAsync(`src/js/${file}`, {
    presets: [
      ['@babel/preset-env'],
    ],
  })),
);

const writeJS = files => Promise.all(
  files.map(file => fs.writeFile(`src/js/out/${path.basename(file.options.filename)}`, file.code)),
);

(async () => {
  try {
    // folder scaffolding
    process.stdout.write('\n⌛ Scaffolding folders...');
    await Promise.all([
      fs.mkdir('dist', { recursive: true }),
      fs.mkdir('src/js/out', { recursive: true }),
    ]);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('✔️ Scaffolding folders');

    // Babel
    process.stdout.write('\n⌛ Transpiling JS...');
    let files = await fs.readdir('src/js');
    files = files.filter(file => path.extname(file).toLowerCase() === '.js');
    const transpiledFiles = await transpileJS(files);
    await writeJS(transpiledFiles);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('✔️ Transpiling JS');

    // pug
    process.stdout.write('\n⌛ Transpiling HTML...');
    await fs.writeFile('dist/index.html', pug.renderFile('src/index.pug', {
      filename: 'src/index.pug',
    }));
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('✔️ Transpiling HTML');

    // sass
    process.stdout.write('\n⌛ Transpiling CSS...');
    const CSS = sass.renderSync({
      file: 'src/style/style.scss',
      sourceMap: true,
      outFile: 'src/style/style.css',
      outputStyle: 'compressed',
    });
    await Promise.all([
      fs.writeFile('src/style/style.css', CSS.css),
      fs.writeFile('src/style/style.css.map', CSS.map),
    ]);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('✔️ Transpiling CSS');

    // inline-source
    process.stdout.write('\n⌛ Inlining source...');
    const html = await inlineSource(path.resolve('dist/index.html'), {
      compress: true,
    });
    await fs.writeFile('dist/index.html', html);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('✔️ Inlining source');

    process.stdout.write('\n✨ Done!');
  } catch (err) {
    process.stdout(err);
  }
})();
