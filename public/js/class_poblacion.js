class Poblacion{
  constructor(n, mundo){
    this.criaturas = []
    this.cantidad_criaturas = n;
    this.mundo = mundo;

    for (var i = 0; i < this.cantidad_criaturas; i++) {
      var x = Math.random() * this.mundo.rejilla_ancho * rejilla_tamano;
      var y = Math.random() * this.mundo.rejilla_alto * rejilla_tamano;
      var t = randrange(criatura_tamano_min, criatura_tamano_max);
      var v = randint(criatura_velocidad_min, criatura_velocidad_max);
      var r = randint(criatura_rango_min, criatura_rango_max);
      var c = new Criatura(x,y,t,v,r, this.mundo);
      this.criaturas.push(c)
    }
  }

  getPoblacion(){
    return this.criaturas;
  }

}