//** Imports
// <script src="js/globals.js"></script>
// <script src="js/class_criatura.js"></script>
// <script src="js/class_poblacion.js"></script>
// <script src="js/class_mundo.js"></script>

// INICIO
$(document).ready(()=>{
  label_poblacion_inicial.html(control_poblacion_inicial.val());
  label_produccion_alimentos.html(control_produccion_alimentos.val());
  label_velocidad_animacion.html(control_velocidad_animacion.val() + "X");
  $("#valor_mutacion").html(control_mutacion.val());
  button_reiniciar.attr("disabled",true);
  button_detener.attr("disabled",true);
});

// MANEJO DE EVENTOS
control_poblacion_inicial.on("input",function(){
  label_poblacion_inicial.html(control_poblacion_inicial.val());
})

control_produccion_alimentos.on("input",function(){
  label_produccion_alimentos.html(control_produccion_alimentos.val());
})

control_velocidad_animacion.on("input",function(){
  label_velocidad_animacion.html(control_velocidad_animacion.val() + "X");
})

control_velocidad_maxima.on("input", function(){
  criatura_velocidad_max = control_velocidad_maxima.val();
});

control_tamano_maximo.on("input", function(){
  criatura_tamano_max = control_tamano_maximo.val();
});

control_rango_maximo.on("input", function(){
  criatura_rango_max = control_rango_maximo.val();
});
control_mutacion.on("input", function(){
  $("#valor_mutacion").html(control_mutacion.val());
});


function correrSimulacion(numero_individuos, cantidad_comida){
  const a = canvas_width/rejilla_tamano;
  const b = canvas_height/rejilla_tamano;
  criatura_tamano_max = control_tamano_maximo.val()
  criatura_velocidad_max = control_velocidad_maxima.val(); 
  criatura_rango_max = control_rango_maximo.val();
  var velocidad_animacion = control_velocidad_animacion.val();

  mundo = new Mundo(a, b, cantidad_comida, ctx);
  var  pop = new Poblacion(numero_individuos, mundo);
  mundo.setPoblacion(pop.getPoblacion());
  mundo.crecer_comida();
  mundo.dibujar();

  crearNuevaSimulacion();

  const FRAME_RATE = 200;
  const dt = 1000/FRAME_RATE;
  const DAY_DURATION = 10; // En segundos
  var c=0;
  var dia = 1;
  simulacion = setInterval(function(){
    var ejecutar = label_estado_simulacion.val();
    if (ejecutar == 1){
      mundo.desmarcarTodo();
      mundo.poblacion.forEach(indv=>{indv.animar(velocidad_animacion*dt)})
      mundo.dibujar();
      $("#pop_cuenta").html(mundo.poblacion.length);
      c++;
      if (c*velocidad_animacion%FRAME_RATE == 0){
        var time_step = c*velocidad_animacion/FRAME_RATE;
        if (time_step%DAY_DURATION == 0){
          var idSimulacion = control_id_simulacion.val();
          agregarASimulacion(idSimulacion, dia, mundo);
          mundo.poblacion = mundo.poblacion.filter(el=>el.comidas>=el.dieta)
          mundo.poblacion.map(el=>el.reset());
          mundo.poblacion.map(el=>el.reproducir());
          mundo.crecer_comida();
          dia++;
          $("#dia_cuenta").html(dia);
          $("#pop_cuenta").html(mundo.poblacion.length);
        }
      }
    }
  }, dt);
}

// EVENTOS DE - BOTONES
button_iniciar.click(()=>{
  // Manage buttons
  button_iniciar.attr("disabled",true);
  button_reiniciar.attr("disabled",false);
  button_detener.attr("disabled",false);
  // Manage inputs
  control_poblacion_inicial.prop("disabled", true);
  control_produccion_alimentos.prop("disabled", true);
  control_velocidad_animacion.prop("disabled", true);
  control_velocidad_maxima.prop("disabled", true);
  control_tamano_maximo.prop("disabled", true);
  control_rango_maximo.prop("disabled", true);

  var ejecutar = label_estado_simulacion.val();
  if (ejecutar != 2){
    console.log("Ejecutar");
    var numero_individuos = control_poblacion_inicial.val();
    var cantidad_comida = control_produccion_alimentos.val();
    correrSimulacion(numero_individuos, cantidad_comida);
    label_estado_simulacion.val(1);
  }
  else{
    label_estado_simulacion.val(1);
  }
})


button_reiniciar.click(()=>{
  clearInterval(simulacion);
  button_reiniciar.attr("disabled",true);
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
  $("#dia_cuenta").html("1");
  $("#pop_cuenta").html("0");
  control_poblacion_inicial.prop("disabled", false);
  control_produccion_alimentos.prop("disabled", false);
  control_velocidad_animacion.prop("disabled", false);
  control_velocidad_maxima.prop("disabled", false);
  control_tamano_maximo.prop("disabled", false);
  control_rango_maximo.prop("disabled", false);

  mundo.clear()
  label_estado_simulacion.val(0);
});

button_detener.click(()=>{
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
  label_estado_simulacion.val(2);
});