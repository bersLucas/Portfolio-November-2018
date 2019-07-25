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
    console.log('Scaffolding folders...');
    await Promise.all([
      fs.mkdir('dist', { recursive: true }),
      fs.mkdir('src/js/out', { recursive: true }),
    ]);

    // Babel
    console.log('Transpiling JS...');
    let files = await fs.readdir('src/js');
    files = files.filter(file => path.extname(file).toLowerCase() === '.js');
    const transpiledFiles = await transpileJS(files);
    await writeJS(transpiledFiles);

    // pug
    console.log('Transpiling HTML...');
    await fs.writeFile('dist/index.html', pug.renderFile('src/index.pug', {
      filename: 'src/index.pug',
    }));

    // sass
    console.log('Transpiling CSS...');
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

    // inline-source
    console.log('Inlining source...');
    const html = await inlineSource(path.resolve('dist/index.html'), {
      compress: true,
    });
    await fs.writeFile('dist/index.html', html);
  } catch (err) {
    console.log(err);
  }
})();
