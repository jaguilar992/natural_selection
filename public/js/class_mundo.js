class Mundo{
  constructor(w,h, n,ctx){
    this.rejilla_ancho = w // rejillla hrztal
    this.rejilla_alto  = h  // rejilla vertical
    this.ctx=ctx;
    this.comida_cantidad = n
    this.grid = true;
    this.comida_mapa = Array.from(Array(this.rejilla_ancho), () => new Array(this.rejilla_alto));
    this.poblacion = [];
    this.marcas = Array.from(Array(this.rejilla_ancho), () => new Array(this.rejilla_alto));
  }

  crecer_comida(){
    var c=0;
    this.comida_mapa = Array.from(Array(this.rejilla_ancho), () => new Array(this.rejilla_alto));
    while (c<this.comida_cantidad)  {
      var x = Math.floor(Math.random() * this.rejilla_ancho);
      var y = Math.floor(Math.random() * this.rejilla_alto);
      if (this.comida_mapa[x][y] != 1){
        this.comida_mapa[x][y] = 1;
        c++;
      }
    }
  }

  dibujar_comida(){
    for (var i = 0; i < this.rejilla_ancho; i++) {
      for (var j = 0; j < this.rejilla_alto; j++) {
        var x = i;
        var y = j;
        if (this.comida_mapa[x][y]==1){
          ctx.fillStyle="#33FFCC";
          ctx.fillRect(x*rejilla_tamano+grid_border,y*rejilla_tamano+grid_border,comida_tamano,comida_tamano);
        }
      }
    }
  }

  clear(){
    this.ctx.clearRect(0,0,canvas_width, canvas_height);
  }

  dibujar_rejilla(){
    for (var i = 0; i < this.rejilla_ancho; i++) {
     for (var j = 0; j < this.rejilla_alto; j++) {
        ctx.fillStyle="#0000000F";
        ctx.fillRect(i*rejilla_tamano+1,j*rejilla_tamano+1,rejilla_tamano-2,rejilla_tamano-2);
      }
    }
  }

  setPoblacion(poblacion){
    this.poblacion = poblacion;
  }

  dibujar_poblacion(){
    for (var i = 0; i < this.poblacion.length; i++) {
      var criatura = this.poblacion[i];
      var x = criatura.x;
      var y = criatura.y;
      var t = criatura.tamano;
      ctx.beginPath();
      ctx.fillStyle = '#FF70A0A0';
      ctx.arc(x,y,t, 0, 2*Math.PI);
      ctx.strokeStyle = "red";
      ctx.fill();
      ctx.stroke();
    }
  }

  dibujar(){
    this.clear();
    if (this.grid) this.dibujar_rejilla();
    // Dev
    this.dibujar_marcas();
    this.dibujar_comida();
    this.dibujar_poblacion();
  }

  hayComida(x,y){
    return this.comida_mapa[x][y] == 1;
  }

  // Dev - Methods
  marcar(x,y, color){
    this.marcas[x][y] = 1;
    this.dibujar();
  }
  desmarcar(x,y){
    this.marcas[x][y] = 0;
    this.dibujar();
  }

  dibujar_marcas(){
    for (var i = 0; i < this.rejilla_ancho; i++) {
     for (var j = 0; j < this.rejilla_alto; j++) {
        if(this.marcas[i][j]==1){
          ctx.fillStyle="#FFDD55";
          ctx.fillRect(i*rejilla_tamano+1,j*rejilla_tamano+1,rejilla_tamano-2,rejilla_tamano-2);
        }
      }
    }
  }
}