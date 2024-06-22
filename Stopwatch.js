let hours = 0;
let minutes = 0;
let seconds = 0;
let lapCount = 0;
let isRunning = false;
let intervalId = null; // Add this variable to store the interval ID

const TIME_INTERVAL = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);

function startStopwatch() {
  if (!isRunning) {
    intervalId = setInterval(updateTime, TIME_INTERVAL); // Store the interval ID
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
  }
}

function pauseStopwatch() {
  if (intervalId!== null) { // Check if the interval is running
    clearInterval(intervalId); // Clear the interval using the stored ID
    intervalId = null; // Reset the interval ID
  }
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetStopwatch() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  lapCount = 0;
  lapList.innerHTML = '';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  if (intervalId!== null) { // Check if the interval is running
    clearInterval(intervalId); // Clear the interval using the stored ID
    intervalId = null; // Reset the interval ID
  }
}

function updateTime() {
  seconds++;
  if (seconds === SECONDS_PER_MINUTE) {
    minutes++;
    seconds = 0;
  }
  if (minutes === MINUTES_PER_HOUR) {
    hours++;
    minutes = 0;
  }
  hoursElement.textContent = pad(hours);
  minutesElement.textContent = pad(minutes);
  secondsElement.textContent = pad(seconds);
}

function addLap() {
  let lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const lapListItem = document.createElement('li');
  lapListItem.textContent = `Lap ${lapCount + 1}: ${lapTime}`;
  lapList.appendChild(lapListItem);
  lapCount++;
}

function pad(time) {
  return time.toString().padStart(2, '0');
}







