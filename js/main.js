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

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-month"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];


class Calendar {
    constructor() {
        this.date = new Date();
        this.currYear = this.date.getFullYear();
        this.currMonth = this.date.getMonth();

        this.daysTag = document.querySelector(".days");
        this.currentDate = document.querySelector(".current-month");
        this.prevNextIcon = document.querySelectorAll(".icons span");

        this.MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"];

        this.renderCalendar();
        this.initializeEventListeners();
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
                this.currMonth = icon.id === "prev" ? this.currMonth - 1 : this.currMonth + 1;

                if (this.currMonth < 0 || this.currMonth > 11) {
                    this.date = new Date(this.currYear, this.currMonth, new Date().getDate());
                    this.currYear = this.date.getFullYear();
                    this.currMonth = this.date.getMonth();
                } else {
                    this.date = new Date();
                }

                this.renderCalendar();
            });
        });
    }
}

const myCalendar = new Calendar();
