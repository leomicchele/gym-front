let intervalID;
let tiempo;

self.onmessage = function(event) {
  if (event.data === 'start') {
    startTimer();
  } else if (event.data === 'stop') {
    stopTimer();
  }
};

function startTimer() {
  tiempo = { minutos: 5, segundos: 0, centesimas: 0 }; // Inicializa el tiempo con los valores deseados
  intervalID = setInterval(updateTimer, 10);
}

function stopTimer() {
  clearInterval(intervalID);
}

function updateTimer() {
  tiempo.centesimas--;

  if (tiempo.centesimas < 0) {
    tiempo.centesimas = 99;
    tiempo.segundos--;

    if (tiempo.segundos < 0) {
      tiempo.segundos = 59;
      tiempo.minutos--;

      if (tiempo.minutos < 0) {
        stopTimer();
        self.postMessage({ type: 'finished' });
        return;
      }
    }
  }

  self.postMessage({ type: 'update', tiempo });
}