var ctx_poblacion = document.getElementById("poblacion").getContext('2d');
var poblacionGraph = new Chart(ctx_poblacion, {
type: 'line',
data: {
  labels: [],
  datasets: [{
    label: 'Poblacion',
    data: [],
    backgroundColor: "#FF000050",
    borderColor: "#FF0000A0",
    borderWidth: 1
  }]
},
});

var ctx_velocidad = document.getElementById("velocidad").getContext('2d');
var velocidadGraph = new Chart(ctx_velocidad, {
type: 'line',
data: {
  labels: [],
  datasets: [{
    label: 'Velocidad',
    data: [],
    backgroundColor: "#00A00050",
    borderColor: "#00A000A0",
    borderWidth: 1
  }]
},
});

var ctx_tamano = document.getElementById("tamano").getContext('2d');
var tamanoGraph = new Chart(ctx_tamano, {
type: 'line',
data: {
  labels: [],
  datasets: [{
    label: 'Tamano',
    data: [],
    backgroundColor: "#70708050",
    borderColor: "#707080A0",
    borderWidth: 1
  }]
},
});

var ctx_rango = document.getElementById("rango").getContext('2d');
var rangoGraph = new Chart(ctx_rango, {
type: 'line',
data: {
  labels: [],
  datasets: [{
    label: 'Rango',
    data: [],
    backgroundColor: "#FF900050",
    borderColor: "#FF9000A0",
    borderWidth: 1
  }]
},
});