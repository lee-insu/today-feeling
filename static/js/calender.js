const init = {
    monList: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayList: ['일','월','화','수','목','금','토'],
    today: new Date(),
    monForChange: new Date.getMonth(),
    activeDate: new Date(),
    getFirstDay: (yy, mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
    nextMonth: function () {
        let day = new Date();
        day.setDate(1);
        day.setMonth(++this.monForChange);
        this.activeDate = day;
        return day;
    },
    prevMonth: function() {
        let day = new Date();
        day.setDate(1);
        day.setMonth(--this.monForChange);
        this.activeDate = day;
        return day;
    },
    addZero: (num) => (num < 10) ? '0' + num : num,
    activeDtag: null,
    getIndex: function(node) {
        let index = 0;
        while (node = node.previousElementSibling) {
            index++;
        }
        return index;
    }
 };

