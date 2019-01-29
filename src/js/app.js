const backdropContainer = document.getElementById('backdrop-container');
let transitioning = false;

const vm = new Vue({
    el: '#app',
    data: {
        works: works,
        selectedWork: {name:null},
        hoveringWork: {},
    },
    methods: {
        open: (work, ev) => {
            if (transitioning) {
                return;
            }
            requestAnimationFrame(()=> {
                transitioning = true;
                let a = `<div class="backdrop" 
                          style="background-color: ${work.bg};
                                 top: ${document.documentElement.scrollTop + ev.clientY}px; 
                                 left: ${ev.clientX}px">
                     </div>`;

                let elem = backdropContainer.appendChild(getNodes(a)[0]);
                elem.style.transform = `scale(${getBackdropHeight()})`;
                setTimeout(() => {
                    document.documentElement.style.backgroundColor = work.bg;
                    elem.remove();
                    transitioning = false;
                }, 1750);
                vm.selectedWork = work;
            });
        },
        hover: (work, bool) => {
            return bool ? vm.hoveringWork = work : vm.hoveringWork = null;
        }
    }
});

const getNodes = str => {
    return new DOMParser().parseFromString(str, 'text/html').body.childNodes;
};

const getBackdropHeight = () => {
    return (Math.max(
        document.body.offsetHeight,
        document.body.offsetWidth
    ) / 64) * 3.5;
};

followCursor([document.querySelector('#app')], 10);