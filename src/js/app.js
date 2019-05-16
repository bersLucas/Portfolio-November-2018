const defaultWork = {
    name: null,
    bg: '#4161f3',
    color: '#f3ecff',
};

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
