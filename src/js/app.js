const defaultColor = (Math.random() * (works.length - 1)).toFixed(0);
const defaultWork = {
    name: null,
    bg: works[defaultColor].bg,
    color: works[defaultColor].color,
};
document.documentElement.style.backgroundColor = defaultWork.bg;

const vm = new Vue({
    el: '#app',
    data: {
        works: works,
        selectedWork: defaultWork,
        hoveringWork: {},
    },
    methods: {
        open: (work) => {
            document.documentElement.style.backgroundColor = work.bg;
            vm.selectedWork = work;
        },
        hover: (work, bool) => {
            return bool ? vm.hoveringWork = work : vm.hoveringWork = null;
        },
        back: () => {
            document.documentElement.style.backgroundColor = defaultWork.bg;
            vm.selectedWork = defaultWork;
        }
    }
});

followCursor([document.querySelector('#app')], 4.5);
