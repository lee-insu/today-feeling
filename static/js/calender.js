const init = {
    monList:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayList: ['일','월','화','수','목','금','토'],
    today: new Date(),
    activeDate: new Date(),
    monChange: new Date().getMonth(),
    activeDay: null,
    getFirstDay: (yy,mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date (yy,mm + 1, 0),
    addZero: (num) => (num < 10) ? '0'+ num : num,
    prevMonth: function() {
        let back = new Date();
        back.setDate(1);
        back.setMonth(--this.monChange);
        this.activeDate = back;
        return back;
    },
    nextMonth: function() {
        let back = new Date();
        back.setDate(1);
        back.setMonth(++this.monChange);
        this.activeDate = back;
        return back;
    }
};



const cdrBody = document.querySelector('.cdr-body'),
      btnPrev = document.querySelector('.cdr-btn.prev'),
      btnNext = document.querySelector('.cdr-btn.next');


/**
 * 
 * @param {number} date 
 * @param {number} day 
 */


let loadDate = (date, day) => {
    document.querySelector('.cdr-date').textContent = date;
    document.querySelector('.cdr-day').textContent = init.dayList[day];
}


let loadYM = (fullDate) => {
    let yy = fullDate.getFullYear(),
        mm = fullDate.getMonth(),
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
        countDay = 0;
    
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for(let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()){
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>'
            }else {
                let fullDate = yy + '.' + init.addZero(mm +1) + init.addZero(countDay + 1);
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

  btnPrev.addEventListener('click',() =>loadYM(init.prevMonth())); 
  btnNext.addEventListener('click', () =>loadYM(init.nextMonth()));
  cdrBody.addEventListener('click',clickDay);


function clickDay (e) {
    let clickToday = e.target;
    if (clickToday.classList.contains('day')) {
        if (init.activeDay) {
            init.activeDay.classList.remove('day-active');
        }
        let day = Number(clickToday.textContent);
        loadDate(day,clickToday.cellIndex);
        clickToday.classList.add('day-active');
        init.activeDay = clickToday;
        init.activeDate.setDate(day);
        console.log(document.querySelector('.day-active').fullDate)
        }
}



function reShowing() {
    keyValue = init.activeDay;
    if (feelList[keyValue] === undefined) {
        inputList.textContent = '';
        feelList[keyValue] = [];
        
        const divs = document.querySelectorAll('#input-list > div');
        divs.forEach(function(e) {
            e.remove();
        });

        const btns = document.querySelectorAll('#input-list > button');
        btns.forEach(function(e1) {
            e1.remove();
         }); 
    }else if (feelList[keyValue].length === 0) {
        inputList.textContent = "";

        const divs = document.querySelectorAll('#input-list > div');
        divs.forEach(function(e) { 
            e.remove();
        });
        const btns = document.querySelectorAll('#input-list > div');
        btns.forEach(function(e1) {
            e1.remove();
        });
    }else{
        const divs = document.querySelectorAll('#input-list > div');
        divs.forEach(function(e) { 
            e.remove();
        });
        const btns = document.querySelectorAll('#input-list > div');
        btns.forEach(function(e1) {
            e1.remove();
        });
        let div = document.createElement('div');
        for(let k = 0; k < feelList[keyValue].length; i++) {
            let div = document.createElement('div');
            div.textContent = '_' + feelList[keyValue][i];
            let btn = document.createElement('button');
            btn.setAttribute('id', 'del-data');
            btn.setAttribute('id',dataCnt + keyValue);
            btn.setAttribute('class', 'del-data');
            btn.textContent = delText;
            inputList.appendChild(div);
            inputList.appendChild(btn);
            div.addEventListener('click',checkList);
            btn.addEventListener('click',delectFeel);
            inputBox.value = '';
            function delectFeel() {
                div.remove();
                btn.remove();
            }
        }
    }
}  
let inputBox = document.querySelector('#input-box'),
    inputDate = document.querySelector('#input-data'),
    inputList = document.querySelector('#input-list'),
    delText = 'x';


  




