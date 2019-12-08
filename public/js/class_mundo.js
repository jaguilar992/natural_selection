class Mundo{
  constructor(w,h, n,ctx){
    this.rejilla_ancho = w // rejillla hrztal
    this.rejilla_alto  = h  // rejilla vertical
    this.ctx=ctx;
    this.comida_cantidad = n
    this.grid = true;
    this.vision = true;
    this.comida_mapa = zeros(this.rejilla_alto, this.rejilla_ancho);
    this.marcas = zeros(this.rejilla_alto, this.rejilla_ancho);
    this.poblacion = [];
  }

  crecer_comida(){
    var c=0;
    this.comida_mapa = zeros(this.rejilla_alto, this.rejilla_ancho);
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

  dibujarRejilla(){
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

  dibujarPoblacion(){
    for (var i = 0; i < this.poblacion.length; i++) {
      var criatura = this.poblacion[i];
      var x = criatura.x;
      var y = criatura.y;
      var t = criatura.tamano;
      // Cuerpo
      ctx.beginPath();
      ctx.fillStyle = '#FF70A0A0';
      ctx.arc(x,y,t, 0, 2*Math.PI);
      ctx.strokeStyle = "red";
      ctx.fill();
      ctx.stroke();
      // Destino - Vector
      var dst = criatura.destino;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(dst[0]*rejilla_tamano + grid_border*2 , dst[1]*rejilla_tamano + grid_border*2);
      ctx.strokeStyle = '#00B8F5';
      ctx.stroke();
      // Alcance
      if (this.vision) criatura.marcarAlcance();
    }
  }

  dibujar(){
    this.clear();
    if (this.grid) this.dibujarRejilla();
    // Dev
    this.dibujarMarcas();
    this.dibujar_comida();
    this.dibujarPoblacion();
  }

  hayComida(x,y){
    return this.comida_mapa[x][y] == 1;
  }

  // Dev - Methods
  marcar(x,y, color){
    this.marcas[x][y] = 1;
    
  }
  
  desmarcar(x,y){
    this.marcas[x][y] = 0;
  }

  desmarcarTodo(){
    this.marcas = zeros(this.rejilla_alto, this.rejilla_ancho);
    this.dibujar();
  }

  dibujarMarcas(){
    for (var i = 0; i < this.rejilla_ancho; i++) {
     for (var j = 0; j < this.rejilla_alto; j++) {
        if(this.marcas[i][j]==1){
          ctx.fillStyle="#FFDD55A0";
          ctx.fillRect(i*rejilla_tamano+1,j*rejilla_tamano+1,rejilla_tamano-2,rejilla_tamano-2);
        }
      }
    }
  }
}