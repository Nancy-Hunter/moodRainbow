class Calendar {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.date = new Date();
        this.currYear = this.date.getFullYear();
        this.currMonth = this.date.getMonth();

        this.daysTag = this.container.querySelector(".days");
        this.currentDate = this.container.querySelector(".current-month");
        this.prevNextIcon = this.container.querySelectorAll(".icons span");

        this.MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"];

        this.linkedCalendar = null;
    }

    incrementMonth() {
        if (this.currMonth == 11) {
            this.currMonth = 0
            this.currYear++
            this.date = new Date(this.currYear, this.currMonth, this.date.getDate())
        } else {
            this.currMonth++
        }
        this.renderCalendar();
    }

    decrementMonth() {
        if (this.currMonth == 0) {
            this.currMonth = 11
            this.currYear--
            this.date = new Date(this.currYear, this.currMonth, this.date.getDate())
        } else {
            this.currMonth--
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

                if (direction == 1) {
                    this.incrementMonth();
                } else {
                    this.decrementMonth();
                }

                if (this.linkedCalendar) {
                    if (direction == 1) {
                        this.linkedCalendar[0].incrementMonth();
                        this.linkedCalendar[1].incrementMonth();
                    } else {
                        this.linkedCalendar[0].decrementMonth();
                        this.linkedCalendar[1].decrementMonth();
                    }
                }
            });
        });
    }
}



const prevCalendar = new Calendar("#calendar0");
prevCalendar.decrementMonth();
prevCalendar.renderCalendar();

const myCalendar = new Calendar("#calendar1");
myCalendar.renderCalendar();
myCalendar.initializeEventListeners();

const nextCalendar = new Calendar("#calendar2");
nextCalendar.incrementMonth();
nextCalendar.renderCalendar();

myCalendar.linkedCalendar = [prevCalendar, nextCalendar];
