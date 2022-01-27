console.log("Inicio");

const d = document,
  $btnNumeros = d.querySelectorAll(".numero"),
  $btnOperacion = d.querySelectorAll(".operacion"),
  $displayPrincipal = d.querySelector(".display-principal"),
  $displaySecundario = d.querySelector(".display-secundario"),
  $btnIgual = d.querySelector(".igual");

class Matematicas {
  sumar(a, b) {
    return a + b;
  }
  restar(a, b) {
    return a - b;
  }
  dividir(a, b) {
    return a % b;
  }
  multiplicar(a, b) {
    return a * b;
  }
}

class Display {
  constructor(displayPrincipal, displaySecundario) {
    this.displayPrincipal = displayPrincipal;
    this.displaySecundario = displaySecundario;
    this.valorPrincipal = "";
    this.valorSecundario = "";
    this.operacion = undefined;
    this.resultado = undefined;
    this.i = 0;
    this.calculadora = new Matematicas();
  }

  btnNumeros(numero) {
    this.valorPrincipal += numero.textContent;

    if (this.operacion !== undefined) {
      this.valorSecundario += numero.textContent;
      this.i = 1;
      this.calculos();
    }
    this.imprimirValores();
  }
  imprimirValores() {
    this.displayPrincipal.innerHTML = `<h2>${this.valorPrincipal}</h2>`;
  }

  btnOperador(operacion) {
    this.operacion = operacion;
    this.i = 0;
    let signo = " ";
    switch (operacion) {
      case "sumar":
        signo = "+";
        break;
      case "restar":
        signo = "-";
        break;
      case "dividir":
        signo = "/";
        break;
      case "multiplicar":
        signo = "x";
        break;
    }
    this.valorPrincipal += signo;
    this.imprimirValores();
    this.calculos();
  }

  calculos() {
    let a = parseInt(this.valorPrincipal),
      b = parseInt(this.valorSecundario);
    console.log(b);

    if (isNaN(a) || isNaN(b)) return;

    if (this.i === 1) {
      console.log(`----Numeros ejecutados----`);
      console.log(`Valor del resultado en b: "${b}"`);
      console.log(`Valor del resultado en a en num:  "${a}"`);
      this.resultado = this.calculadora[this.operacion](a, b);
      console.log(this.resultado);
    } else {
      this.valorPrincipal = parseInt(this.resultado);
      this.valorSecundario = 0;
      a = this.valorPrincipal;
      b = parseInt(this.valorSecundario);
      console.log(`---Operador ejecutado ${this.operacion}---`);
      console.log(`Valor del resultado en a: "${a}"`);
      console.log(`Valor del resultado en b: "${b}"`);
      console.log(this.valorPrincipal);
    }
  }

  igual() {
    this.displayPrincipal.innerHTML = `<h2>${this.resultado}</h2>`;
    this.displaySecundario.innerHTML = " ";
  }
}

// -----Instanciando la clase
const display = new Display($displayPrincipal, $displaySecundario);

//-----Eventos de click -------

$btnNumeros.forEach((num) => {
  num.addEventListener("click", (e) => {
    display.btnNumeros(num);
  });
});

$btnOperacion.forEach((operador) => {
  operador.addEventListener("click", (e) => {
    display.btnOperador(operador.value);
  });
});

$btnIgual.addEventListener("click", (e) => {
  display.igual();
});
