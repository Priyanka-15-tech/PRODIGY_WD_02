let startTime;
let currentTime;
let elapsedTime;
let timerInterval;
let isRunning = false;
let laps = [];
let lapCount = 1;

const displayTime = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapTimes');

function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    displayTime.innerHTML = '00:00:00.00';
    laps = [];
    lapCount = 1;
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = displayTime.innerHTML;
        laps.push(lapTime);
        const li = document.createElement('li');
        li.innerHTML = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(li);
        lapCount++;
    }
}

function updateTime() {
    currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const hours = Math.floor((elapsedTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    displayTime.innerHTML = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + '.' + 
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
