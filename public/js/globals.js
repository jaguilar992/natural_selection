// Funciones
function randrange(a,b){
  return a + Math.random() * (b-a);
}

function randint(a,b){
 return Math.floor(a + Math.random() * (b-a));
}

function acos(x,y){
  var distancia = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
  if (distancia == 0) return 0;
  if (y<0) return 2*Math.PI - Math.acos(x / distancia);
  return Math.acos(x / distancia);
}

function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

const zeros = (m, n) => [...Array(n)].map(e => Array(m).fill(0));

// DOM - elements
const control_poblacion_inicial = $("input[name='poblacion_inicial']");
const control_produccion_alimentos = $("input[name='produccion_alimentos']");
const control_velocidad_animacion = $("input[name='velocidad_animacion']");
const control_velocidad_maxima = $("input[name='velocidad_maxima']");
const control_tamano_maximo = $("input[name='tamano_maximo']");
const control_rango_maximo = $("input[name='rango_maximo']");
const control_mutacion = $("input[name='mutacion']");
const control_id_simulacion = $("input[name='id_simulacion']");

const label_poblacion_inicial = $("#valor_poblacion_inicial")
const label_produccion_alimentos = $("#valor_producccion_alimentos");
const label_velocidad_animacion = $("#valor_velocidad");
const label_estado_simulacion = $("input[name='estado_simulacion']");
const button_iniciar = $("button#button_iniciar");
const button_detener = $("button#button_detener");
const button_reiniciar = $("button#button_reiniciar");

// Canvas
const canvas = $("#mundo")[0];
const ctx = canvas.getContext("2d");

// VARIABLES
const canvas_width = 700;
const canvas_height = 500;
const rejilla_tamano = 20
const rejilla_ancho  = canvas_width/rejilla_tamano
const rejilla_alto  = canvas_height/rejilla_tamano
const comida_tamano = rejilla_tamano/2; // NO MODIFICAR - MODIFICAR GRID_TAMANO
const grid_border = rejilla_tamano/4;   // NO MODIFICAR - MODIFICAR GRID_TAMANO

const criatura_tamano_min = 5;
const criatura_velocidad_min = 10;
const criatura_rango_min =  1;

var mundo;
var simulacion;

var criatura_tamano_max ;
var criatura_velocidad_max ;
var criatura_rango_max ;
const speed_color = ["#845EC2", "#D65DB1", "#FF6F91", "#FFC75F", "#F9F871"]