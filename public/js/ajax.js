function agregarASimulacion(idSimulacion, dia, mundo){
  // ADD:: SIMULACION
  var poblacion =  mundo.poblacion.length;
  var vmedia    =  mundo.poblacion.map(el=>el.velocidad).reduce((a,n)=>a+n)/poblacion;
  var tmedia    =  mundo.poblacion.map(el=>el.tamano).reduce((a,n)=>a+n)/poblacion;
  var rmedia    =  mundo.poblacion.map(el=>el.rango).reduce((a,n)=>a+n)/poblacion;
  var settingsAdd = {
    "async": true,
    "crossDomain": true,
    "url": `http://localhost:8520/simu/${idSimulacion}/${dia}`,
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "poblacion": poblacion,
      "velocidad": vmedia,
      "tamano": tmedia,
      "rango": rmedia
    }
  }

  $.ajax(settingsAdd).done(function (response) {
    if(response.affectedRows){
      return true;
    }
  });
}

function crearNuevaSimulacion(){
  var settingsNueva = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8520/simu/nueva",
    "method": "GET",
  }
  $.ajax(settingsNueva).done(function (response) {
    console.log(response);
    var idSimulacion = response.id_simulacion;
    control_id_simulacion.val(idSimulacion);
  });
}

var data;
//GET ALL [Datos de ultima simulacion]
function getSimuData(){
  setInterval(()=>{  
    var settingsAll = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8520/simu",
      "dataType": "JSON",
      "method": "GET",
    }
    $.ajax(settingsAll).done(function (response) {
      if (response.length){
        data = response;
        var dias = data.map(a=>a.dia_simulacion);
        var pobl = data.map(a=>a.poblacion);
        var velo = data.map(a=>a.velocidad_media);
        var tama = data.map(a=>a.tamano_medio);
        var rango = data.map(a=>a.rango_medio);

        poblacionGraph.data.labels = dias;
        poblacionGraph.data.datasets[0].data = pobl;
        poblacionGraph.update();

        velocidadGraph.data.labels = dias;
        velocidadGraph.data.datasets[0].data = velo;
        velocidadGraph.update();

        tamanoGraph.data.labels = dias;
        tamanoGraph.data.datasets[0].data = tama;
        tamanoGraph.update();

        rangoGraph.data.labels = dias;
        rangoGraph.data.datasets[0].data = rango;
        rangoGraph.update();
      }
    });
  }, 1000);
}