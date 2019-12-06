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


// EVENTOS DE - BOTONES
button_iniciar.click(()=>{
  button_iniciar.attr("disabled",true);
  button_reiniciar.attr("disabled",false);
  button_detener.attr("disabled",false);
  var poblacion = control_poblacion_inicial.val();
  var cantidad_comida = control_produccion_alimentos.val();
})


button_reiniciar.click(()=>{
  button_reiniciar.attr("disabled",true);
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
});

button_detener.click(()=>{
  button_detener.attr("disabled",true);
  button_iniciar.attr("disabled",false);
});


const a = canvas_width/rejilla_tamano;
const b = canvas_height/rejilla_tamano;
var  mundo = new Mundo(a, b, 50, ctx);
var  pop = new Poblacion(1, mundo);
mundo.setPoblacion(pop.getPoblacion());
mundo.crecer_comida();
mundo.dibujar();


jimmy = mundo.poblacion[0]
var u,v;
[u,v] = jimmy.getRejilla()
mundo.marcar(u,v)
console.log(u,v)
console.log(jimmy.rango)
