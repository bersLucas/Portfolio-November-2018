const vm = new Vue({
    el: '#app',
    data: {
        works: works,
        selectedWork: {},
        hoveringWork: {},
    },
    methods: {
        open: function (work) {
            vm.selectedWork = work;
            document.documentElement.style.backgroundColor = work.bg;
        },
        hover: function (work, bool) {
            return bool ? vm.hoveringWork = work : vm.hoveringWork = null;
        }
    }
});