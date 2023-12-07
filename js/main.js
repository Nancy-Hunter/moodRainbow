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

const daysTag = document.querySelector(".days")
const currentDate = document.querySelector(".current-month")
const prevNextIcon = document.querySelectorAll(".icons span")
// getting new date, current year and month
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()
let colorPalette = []
let colorTarget 
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() // getting first weekday of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate() // getting last date (number day) of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay() // getting last weekday of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate() // getting last date (number day) of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
})

function addColor () {
    let li = document.createElement('li')

    li.textContent = document.querySelector('#popup').value

    document.querySelector('#palette').append(li)
    
    colorPalette.push(input.value)// adds nav list to an array

    document.getElementById('palette').addEventListener('click', function (e) {
        //adds eventlistners to navigation bar drinks
            if(e.target && e.target.nodeName == "LI") {
            // List item found!  Output the ID!
                console.log(e.target.textContent);
                colorTarget =  e.target.textContent
            }
        })
}

function clickMe() {
    let text = document.getElementById("popup");
    text.classList.toggle("hide");
    text.classList.toggle("show");
    let color = document.getElementById("popupColor");
    color.classList.toggle("hide");
    color.classList.toggle("show");
    document.querySelector("html").addEventListener("keypress", function (press) {
          if (press.key === "Enter") {
            addColor()
          }
      })
  }