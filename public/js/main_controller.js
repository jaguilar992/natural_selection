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

var mundo;
var simulacion;

function correrSimulacion(numero_individuos, cantidad_comida){
  const a = canvas_width/rejilla_tamano;
  const b = canvas_height/rejilla_tamano;
  mundo = new Mundo(a, b, cantidad_comida, ctx);
  var  pop = new Poblacion(numero_individuos, mundo);
  mundo.setPoblacion(pop.getPoblacion());
  mundo.crecer_comida();

  mundo.dibujar();
  var FRAME_RATE = 200;
  var dt = 1000/FRAME_RATE;
  var c=0
  simulacion = setInterval(function(){
    var ejecutar = label_estado_simulacion.val();
    if (ejecutar == 1){
      mundo.desmarcarTodo();
      var velocidad_animacion = control_velocidad_animacion.val();
      mundo.poblacion.forEach(indv=>{indv.animar(velocidad_animacion*dt)})
      mundo.dibujar();
      c++;
    }
  }, dt);
}

// EVENTOS DE - BOTONES
button_iniciar.click(()=>{
  button_iniciar.attr("disabled",true);
  button_reiniciar.attr("disabled",false);
  button_detener.attr("disabled",false);
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
  button_reiniciar.attr("disabled",true);
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
  clearInterval(simulacion);
  mundo.clear()
  label_estado_simulacion.val(0);
});

button_detener.click(()=>{
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
  label_estado_simulacion.val(2);
});