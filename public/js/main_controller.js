// GLOBALS
const control_poblacion_inicial = $("input[name='poblacion_inicial']");
const control_produccion_alimentos = $("input[name='produccion_alimentos']");
const control_velocidad_animacion = $("input[name='velocidad_animacion']");
const label_poblacion_inicial = $("#valor_poblacion_inicial")
const label_produccion_alimentos = $("#valor_producccion_alimentos");
const label_velocidad_animacion = $("#valor_velocidad");
const button_iniciar = $("button#button_iniciar");
const button_detener = $("button#button_detener");
const button_reiniciar = $("button#button_reiniciar");

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


// BOTONES
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