let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = Math.floor(ms % 1000);

  return (
    pad(hours) + ':' +
    pad(minutes) + ':' +
    pad(seconds) + '.' +
    pad(milliseconds, 3)
  );
}

function pad(number, length = 2) {
  return ('0' + number).slice(-length);
}

function startPause() {
  if (startPauseButton.textContent === 'Start' || startPauseButton.textContent === 'Resume') {
    start();
    startPauseButton.textContent = 'Pause';
  } else {
    pause();
    startPauseButton.textContent = 'Resume';
  }
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  startPauseButton.textContent = 'Start';
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
  lapsList.innerHTML = '';
}

function lap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
