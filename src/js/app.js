const backdropContainer = document.getElementById('backdrop-container');
let transitioning = false;
const defaultWork = {
    name: null,
    bg: '#4161f3',
    color: '#f3ecff',
}

const vm = new Vue({
    el: '#app',
    data: {
        works: works,
        selectedWork: defaultWork,
        hoveringWork: {},
    },
    methods: {
        open: (work, ev) => {
            if (transitioning) {
                return;
            }
            requestAnimationFrame(()=> {
                transitionTo(work, ev);
            });
        },
        hover: (work, bool) => {
            return bool ? vm.hoveringWork = work : vm.hoveringWork = null;
        },
        back: (ev) => {
            vm.selectedWork = {name: null};
            transitionTo(defaultWork, ev)
        }
    }
});

const getNodes = str => {
    return new DOMParser().parseFromString(str, 'text/html').body.childNodes;
};

const getBackdropHeight = () => {
    return Math.max(
        document.body.offsetHeight,
        document.body.offsetWidth
    ) * .1;
};

const transitionTo = (work,ev) => {
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
    }, 1250);
    vm.selectedWork = work;
};

followCursor([document.querySelector('#app')], 4.5);