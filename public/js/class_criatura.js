function acos(x,y){
  return Math.acos(x / Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
}

class Criatura{
  constructor(x,y,tamano,velocidad,rango){
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.rango = rango;
    this.direccion = 0; // 0° -> 360°
    this.mundo = mundo;
    this.alcance = [];
    this.estados = {
      "reposo": 0,
      "movimiento": 1
    };
    this.objetivos = {
      "comida": 0,
      "ninguno": 1
    }
    this.estado = this.estados["reposo"];
    this.objetivo = this.objetivos["ninguno"];
  }

  setTamano(tamano){
    this.tamano = tamano
  }

  getTamano(){
    return this.tamano
  }

  setVelocidad(velocidad){
    this.velocidad = velocidad
  }

  getVelocidad(){
    return this.velocidad
  }

  setRango(rango){
    this.rango = rango
  }

  getTango(){
    return this.rango
  }

  getRejilla(){
    var x = Math.floor((this.x)/rejilla_tamano);
    var y = Math.floor((this.y)/rejilla_tamano);
    return [x,y];
  }

  getAlcance(){
    var celdas = [];
    var x,y;
    [x,y] = this.getRejilla();
    var i = x - this.rango;
    while (i<=x+this.rango){
      if (i>=0 && i<this.mundo.rejilla_ancho) {
        var j = y - this.rango;
        while (j<=y+this.rango && j<this.mundo.rejilla_alto){
          if (j>=0) celdas.push([i,j]);
          j++;
        }
      }
      i++;
    }
    return celdas;
  }

  //Dev
  marcarAlcance(){
    alcance = this.getAlcance();
    alcance.forEach((el)=>{
      var x,y;
      [x,y] = el;
      mundo.marcar(x,y);
    });
  }

  buscarComida(){
    var distancia_min = Math.sqrt(Math.pow(canvas_width,2), Math.pow(canvas_height,2));
    this.alcance = this.getAlcance();
    var encontro_comida = false;
    var destino = [];
    for (var i = 0 ; i<this.alcance.length; i++){
      var x,y ;
      [x,y] = this.alcance[i];
      if (this.mundo.hayComida(x,y)){
        encontro_comida = true;
        var r,th;
        [r,th] = this.calcularRuta(x,y);
        if (r<distancia_min) {
          destino = this.alcance[i];
          distancia_min = r;
        }
      }
    }
    return [encontro_comida, destino[0], destino[1], th];
  }

  calcularRuta(grid_x,grid_y){
    // this.direccion
    if (grid_x == undefined) {
      var grid_x = this.getRejilla()[0];
    } 
    if (grid_y == undefined) {
      var grid_y = this.getRejilla()[1];
    } 
    var x2 = grid_x * rejilla_tamano + 10;
    var y2 = grid_y * rejilla_tamano + 10;
    var distancia = Math.sqrt(Math.pow(this.x-x2,2) + Math.pow(this.y-y2,2));
    var angulo = acos(x2-this.x, y2-this.y);
    return [distancia, angulo];
  }

  moveTo(x,y){
    this.x = x;
    this.y = y;
  }

  reproducir () {
    var nueva = new Criatura(this.x, this.y);
    nueva.setTamano(this.tamano);
    nueva.setRango(this.rango);
    nueva.setVelocidad(this.velocidad);
    return nueva;
  }
}







