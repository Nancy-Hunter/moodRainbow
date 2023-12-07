// document.querySelector('#clickMe').addEventListener('click', makeReq)

// async function makeReq(){

//   const userName = document.querySelector("#userName").value;
//   const res = await fetch(`/api?student=${userName}`)
//   const data = await res.json()

//   console.log(data);
//   document.querySelector("#personName").textContent = data.name
//   document.querySelector("#personStatus").textContent = data.status
//   document.querySelector("#personOccupation").textContent = data.currentOccupation
// }

let currDate = new Date()


class Calendar {
    constructor(containerSelector, date=currDate, linkedCalendar = null) {
        this.container = document.querySelector(containerSelector);
        this.date = date;
        this.currYear = this.date.getFullYear();
        this.currMonth = this.date.getMonth();

        this.daysTag = this.container.querySelector(".days");
        this.currentDate = this.container.querySelector(".current-month");
        this.prevNextIcon = this.container.querySelectorAll(".icons span");

        this.MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"];

        this.linkedCalendar = linkedCalendar;
        // this.renderCalendar();
        // this.initializeEventListeners();
    }

    setMonth(month) {
        console.log(this.container.id, month)
        this.currMonth = month;
        if (this.currMonth < 0) {
            if (this.currMonth == -1) {
                this.date = new Date(this.currYear - 1, 11, 1);
            }
            this.currYear = this.date.getFullYear();
            this.currMonth = this.date.getMonth();
        } else if (this.currMonth > 11) {
            if (this.currMonth == 12) {
                this.date = new Date(this.currYear + 1, this.currMonth % 12, 1);
            } else { // 13 by default
                this.date = new Date(this.currYear, this.currMonth % 12, 1);
            }
            this.currYear = this.date.getFullYear();
            this.currMonth = this.date.getMonth();
        } else {
            this.date = new Date(this.currYear, this.currMonth, 1);
        }
        this.renderCalendar();
    }

    renderCalendar() {

        let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
        let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === this.date.getDate() && this.currMonth === new Date().getMonth()
                        && this.currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }

        this.currentDate.innerText = `${this.MONTHS[this.currMonth]} ${this.currYear}`;
        this.daysTag.innerHTML = liTag;
    }

    initializeEventListeners() {
        this.prevNextIcon.forEach(icon => {
            icon.addEventListener("click", () => {
                // Determine the direction of the change
                const direction = icon.id === "prev" ? -1 : 1;
                let newMonth = this.currMonth + direction;
                this.setMonth(newMonth);

                if (this.linkedCalendar) {
                    if (newMonth === 10 && direction === -1) {
                        this.linkedCalendar[1].setMonth(direction)
                    } else {
                        this.linkedCalendar[1].setMonth(newMonth + 1)
                    }
                    if (newMonth === -1 && direction === -1) {
                        this.linkedCalendar[0].setMonth(10)
                    } else {
                        this.linkedCalendar[0].setMonth(newMonth - 1)
                    }
                }
            });
        });
    }
}

const myCalendar = new Calendar("#calendar1");
myCalendar.renderCalendar();
myCalendar.initializeEventListeners();

let prevMonth = new Date();
prevMonth.setMonth(myCalendar.date.getMonth() - 1);
prevMonth.setDate(1);
const prevCalendar = new Calendar("#calendar0", prevMonth);

prevCalendar.renderCalendar();

let nextMonth = new Date();
nextMonth.setMonth(myCalendar.date.getMonth() + 1);
nextMonth.setDate(1);
const nextCalendar = new Calendar("#calendar2", nextMonth);


myCalendar.linkedCalendar = [prevCalendar, nextCalendar];

nextCalendar.renderCalendar();
