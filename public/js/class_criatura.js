class Criatura{
  constructor(x,y,tamano,velocidad,rango){
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.rango = rango;
    this.direccion = 0; // 0° -> 360°
    this.mundo = mundo;
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







