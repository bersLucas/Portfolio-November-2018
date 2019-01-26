var vm = new Vue({
    el: '#container',
    data: {
        works: works,
        selectedWork: {}
    },
    methods: {
        open: function (work) {
            vm.selectedWork = work;
            document.documentElement.style.backgroundColor = work.bg;
        }
    }
});

var generateBorderRadius = function () {
    var r = new Array(1, 2, 3, 4).map(function () {
        return Math.floor(Math.random() * 100)
    });

    return r[0] + "% " + (100 - r[0]) + "% " + r[1] + "% " + (100 - r[1]) + "% / " + r[2] + "% " + r[3] + "% " + (100 - r[3]) + "% " + (100 - r[2]) + "%";
};

vm.works = vm.works.map(function (work) {
    work.borderRadius = generateBorderRadius();
    return work;
});