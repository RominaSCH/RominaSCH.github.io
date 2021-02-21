const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const dateTitle = clockContainer.querySelector("h4");

function getTime() {
    let date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours<10 ? `0${hours}` : hours}:${
        minutes<10 ? `0${minutes}` : minutes}:${
        seconds<10 ? `0${seconds}` : seconds
    }`;
}

function getYMD(){
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    dateTitle.innerText = `${year}.${month}.${day}`;
}

function init() {
    getTime();
    getYMD();
    setInterval(getTime, 1000);
    setInterval(getYMD, 1000);
}
init();

