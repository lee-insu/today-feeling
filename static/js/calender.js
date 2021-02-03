const init = {
    monList:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayList: ['일','월','화','수','목','금','토'],
    today: new Date(),
    getFirstDay: (yy,mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date (yy,mm + 1, 0),
    zeroMonth: (num) => (num < 10) ? '0'+ num : num
};

const cdrBody = document.querySelector('.cdr-body'),
      btnPrev = document.querySelector('.cdr-btn.prev'),
      btnNext = document.querySelector('.cdr-btn.next');


/**
 * 
 * @param {number} date 
 * @param {number} day 
 */


let loadDate = (date,day) => {
    document.querySelector('cdr-date').textContent = date;
    document.querySelector('cdr-day').textContent = init.dayList[day];
}


let loadYM = (fullDate) => {
    let yy = init.today.getFullYear(),
        mm = init.today.getMonth(),
        firstDay = init.getFirstDay(yy, mm),
        lastDay = init.getLastDay(yy, mm),
        clickToday = '';

    if (mm === init.today.getMonth() && yy == init.today.getFullYear()) {
        clickToday = init.today.getDate();
    }

    document.querySelector('.cdr-month').textContent = init.monList[mm];
    document.querySelector('.cdr-year').textContent = yy;

    let trtd ='',
        startCount,
        countDay=0;
    
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for(let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()){
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>'
            }else {
                let fullDate = yy + '.' + init.zeroMonth(mm + 1) + init.zeroMonth(countDay + 1);
                trtd += '<td class="day';
                trtd += (clickToday && clickToday === countDay + 1) ? ' today" ' : '"';
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
            }
            trtd += (startCount) ? ++countDay : '';
            if (countDay === lastDay.getDate()) { 
             startCount = 0; 
        }
        trtd += '</td>';
        } 
        trtd += '</tr>';
    }
    cdrBody.innerHTML = trtd;
}

  loadYM(init.today);
  loadDate(init.today.getDate(), init.today.getDay());