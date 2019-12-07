// DOM - elements
const control_poblacion_inicial = $("input[name='poblacion_inicial']");
const control_produccion_alimentos = $("input[name='produccion_alimentos']");
const control_velocidad_animacion = $("input[name='velocidad_animacion']");
const label_poblacion_inicial = $("#valor_poblacion_inicial")
const label_produccion_alimentos = $("#valor_producccion_alimentos");
const label_velocidad_animacion = $("#valor_velocidad");
const button_iniciar = $("button#button_iniciar");
const button_detener = $("button#button_detener");
const button_reiniciar = $("button#button_reiniciar");

// Canvas
const canvas = $("#mundo")[0];
const ctx = canvas.getContext("2d");

// VARIABLES
const canvas_width = 700;
const canvas_height = 400;
const rejilla_tamano = 20
const rejilla_ancho  = canvas_width/rejilla_tamano
const rejilla_alto  = canvas_height/rejilla_tamano
const comida_tamano = rejilla_tamano/2; // NO MODIFICAR - MODIFICAR GRID_TAMANO
const grid_border = rejilla_tamano/4;   // NO MODIFICAR - MODIFICAR GRID_TAMANO

const criatura_tamano_min = 8;
const criatura_tamano_max = 16;
const dtamano = criatura_tamano_max - criatura_tamano_min;

const criatura_velocidad_min = 20;
const criatura_velocidad_max = 100;
const dvelocidad = criatura_velocidad_min - criatura_velocidad_max;

const criatura_rango_min =  1;
const criatura_rango_max =  4;
const drango = criatura_rango_min - criatura_rango_max;

function randrange(a,b){
  return a + Math.random() * (b-a);
}

function randint(a,b){
 return Math.floor(a + Math.random() * (b-a));
}