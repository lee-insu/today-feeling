const init = {
    monList: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayList: ['일','월','화','수','목','금','토'],
    today: new Date(),
    monForChange: new Date().getMonth(),
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
    activeDTag: null,
    
 };

 const calBody = document.querySelector('.cdr-body'),
       btnPrev = document.querySelector('.cdr-btn.prev'),
       btnNext = document.querySelector('.cdr-btn.next');

/**
 * 
 * @param {number} date 
 * @param {number} dayIn 
 */

function loadDate(date,dayIn) {
    document.querySelector('.cdr-date').textContent = date;
    document.querySelector('.cdr-day').textContent = init.dayList[dayIn];
    
    
}

/**
 * 
 * @param {date} fullDate 
 */

function loadYM(fullDate) {
    let yy = fullDate.getFullYear(),
        mm = fullDate.getMonth(),
        firstDay = init.getFirstDay(yy,mm),
        lastDay = init.getLastDay(yy,mm),
        markToday;

    if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
        markToday = init.today.getDate();
    }

    document.querySelector('.cdr-month').textContent = init.monList[mm];
    document.querySelector('.cdr-year').textContent = yy;

    let trtd ='';
    let startCount;
    let countDay= 0;
    
    for(let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for(let j = 0; j < 7; j ++) {
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1;
            }

            if (!startCount) {
                trtd += '<td>'
            }else {
                let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
                trtd += '<td class="day';
                trtd += (markToday && markToday === countDay + 1) ? 'today"' : '"';
                trtd += `data-date="${countDay + 1}" data-fdate"${fullDate}>`;
            }

            trtd += (startCount) ? ++countDay : '';

            if (countDay === lastDay.getDate()) {
                startCount = 0;
            }

            trtd += '</td>';
        }
        trtd += '</tr>';
    }
    calBody.innerHTML = trtd;
}

/**
 * @param {string} val
 */

 function createNewList (val) {
     let id = new Date().getTime() + '',
         yy = init.activeDate.getFullYear(),
         mm = init.activeDate.getMonth() + 1,
         dd = init.activeDate.getDate();
         const starget = calBody.querySelector(`day[data-date="${dd}"]`);

         let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

         let eventData = {};
         evenData['date'] = date;
         evenData['memo'] = val;
         evenData['complete'] = false;
         evemData['id'] = id;
         init.event.push(evenData);
         let todoList= '';
         todoList.appendChild(createLi(id, val, date));
 }

 btnPrev.addEventListener('click', () => loadYM(init.prevMonth()));
 btnNext.addEventListener('click', () => loadYM(init.nextMonth()));

 calBody.addEventListener('click', (e) => {
     if (e.target.classList.contains('day')) {
         if(init.activeDTag) {
             init.activeDTag.classList.remove('day-active');
         }
         let day = Number(e.target.textContent);
      loadDate(day, e.target.cellIndex);
      e.target.classList.add('day-active');
      init.activeDTag = e.target;
      init.activeDate.setDate(day);
     }
 });




 
