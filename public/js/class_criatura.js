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
    this.destino = [];
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
    this.comidas = 0;
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
    var x,y;
    [x,y] = this.getRejilla();
    var cols = range(x-this.rango, x+this.rango).filter(i=> (i>=0 && i<this.mundo.rejilla_ancho));
    var rows = range(y-this.rango, y+this.rango).filter(i=> (i>=0 && i< this.mundo.rejilla_alto));
    return (cols.map(i => rows.map(j => [i,j]))).reduce((a,n) => a.concat(n) , []);
  }

  calcularRuta(grid_x,grid_y){
    if (grid_x == undefined) var grid_x = this.getRejilla()[0];
    if (grid_y == undefined) var grid_y = this.getRejilla()[1];
    var x2 = grid_x * rejilla_tamano + grid_border;
    var y2 = grid_y * rejilla_tamano + grid_border;
    var distancia = Math.sqrt(Math.pow(this.x-x2,2) + Math.pow(this.y-y2,2));
    var angulo = acos(x2-this.x, y2-this.y);
    return [distancia, angulo];
  }

  //Dev
  marcarAlcance(){
    var alcance = this.getAlcance();
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
    var angulo = 0;
    for (var i = 0 ; i<this.alcance.length; i++){
      var x,y ; [x,y] = this.alcance[i];
      if (this.mundo.hayComida(x,y)){
        encontro_comida = true;
        var r,th; [r,th] = this.calcularRuta(x,y);
        if (r<distancia_min) {
          destino = this.alcance[i];
          distancia_min = r;
          angulo = th;
        }
      }
    }
    return [encontro_comida,angulo,destino[0], destino[1]];
  }

  getExterior(){
    var x,y; [x,y] = this.getRejilla();
    var cols = range(x-this.rango, x+this.rango).filter(i=> (i>=0 && i<this.mundo.rejilla_ancho));
    var rows = range(y-this.rango, y+this.rango).filter(i=> (i>=0 && i< this.mundo.rejilla_alto));
    var celdas = [];
    celdas.push(
      ...[rows[0], rows[rows.length-1]]
      .map(j => cols.map(i => [i,j]))
      .reduce((f,n) => f.concat(n), [])
    );
    celdas.push(
      ...[cols[0], cols[cols.length-1]]
      .map(i => rows.slice(1, -1).map(j => [i,j]))
      .reduce((f,n) => f.concat(n), [])
    );
    return celdas;
  }

  buscarNuevoLugar(){
    var exterior = this.getExterior();
    var x,y; [x,y] = exterior[Math.floor(exterior.length * Math.random())];
    var r, th; [r, th] = this.calcularRuta(x,y);
    return [true,th,x,y];
  }

  moveTo(x,y){
    this.x = x;
    this.y = y;
  }

  darPaso(t){
    var ds = this.velocidad * t / 1000;
    var dx = Math.cos(this.direccion) * ds;
    var dy = Math.sin(this.direccion) * ds;
    var new_x= this.x + dx;
    var new_y= this.y + dy;
    if(new_x - this.tamano < 0) {this.x = this.tamano;}
    else if (new_x + this.tamano > canvas_width) {this.x = canvas_width - this.tamano;}
    else this.x = new_x;

    if(new_y - this.tamano < 0) {this.y = this.tamano;}
    else if (new_y + this.tamano > canvas_height) {this.y = canvas_height - this.tamano;}
    else this.y = new_y;
  }

  animar(t){
    if (this.estado == this.estados["reposo"]){
      // Busqueda de alimento
      if(this.comidas < 2){
        var hayComida, angulo, x,y; 
        [hayComida,angulo,x,y] = this.buscarComida()
        if (hayComida){
          this.destino = [x,y];
          this.direccion = angulo;
          this.estado = this.estados["movimiento"];
          this.objetivo = this.objetivos["comida"];
        }else{
          [hayComida,angulo,x,y] = this.buscarNuevoLugar();
          this.destino = [x,y];
          this.direccion = angulo;
          this.estado = this.estados["movimiento"];
          this.objetivo = this.objetivos["ninguno"];
        }
      }
    // Movimiento
    }else if (this.estado == this.estados["movimiento"]){
      var x2,y2, llegoAdestino; [x2,y2] = this.getRejilla();
      llegoAdestino = (this.destino[0] == x2) && (this.destino[1] == y2);
      if (this.objetivo == this.objetivos["comida"]){
        if (llegoAdestino){
          this.objetivo = this.objetivos["ninguno"];
          this.estado = this.estados["reposo"];
          // this.direccion = 0;
          if (this.mundo.hayComida(x2,y2)) {
            this.mundo.comida_mapa[x2][y2] = 0;
            this.comidas+=1;
          }
        }else{
          this.darPaso(t);
        }
      }else{
        if (llegoAdestino){
          this.objetivo = this.objetivos["ninguno"];
          this.estado = this.estados["reposo"];
          // this.direccion = 0;
        }else{
          this.darPaso(t);
        }
      }
    }
  }

  reproducir () {
    var nueva = new Criatura(this.x, this.y);
    nueva.setTamano(this.tamano);
    nueva.setRango(this.rango);
    nueva.setVelocidad(this.velocidad);
    return nueva;
  }
}







