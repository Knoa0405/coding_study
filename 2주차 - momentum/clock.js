const clock = document.querySelector(".js-clock span.clock");
const date = document.querySelector(".js-clock h2");
const timeLeft = document.querySelector(".js-clock span.time-left");
const todayDate = document.querySelector(".js-clock h2.today-date");

function realTimeClock() {
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    clock.textContent = `${hours}:${minute}:${seconds}`;
    timeLeft.textContent = `${23-hours}:${59-minute<10 ? `0${59-minute}` : `${59-minute}`}:${60-seconds<10 ? `0${60-seconds}` : `${60-seconds}`}`
}

function init() {
    setInterval(realTimeClock, 500);
}

init();