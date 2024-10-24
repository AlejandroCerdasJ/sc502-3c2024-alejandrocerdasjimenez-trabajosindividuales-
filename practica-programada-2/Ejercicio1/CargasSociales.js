function calcular() {
    let salarioBruto = parseFloat(document.getElementById("salarioBruto").value);

    // Calcular la carga social
    let cargaSocial = salarioBruto * 0.01067;
    let salarioDespuesCargaSocial = salarioBruto - cargaSocial;

    // Calcular el impuesto sobre la renta
    let impuestoRenta;
    if (salarioDespuesCargaSocial > 4445000) {
        impuestoRenta = salarioDespuesCargaSocial * 0.025;
    } else if (salarioDespuesCargaSocial > 2223000) {
        impuestoRenta = salarioDespuesCargaSocial * 0.020;
    } else if (salarioDespuesCargaSocial > 1267000) {
        impuestoRenta = salarioDespuesCargaSocial * 0.015;
    } else if (salarioDespuesCargaSocial > 863000) {
        impuestoRenta = salarioDespuesCargaSocial * 0.010;
    } else {
        impuestoRenta = 0;
    }

    // Calcular el salario neto
    let salarioNeto = salarioDespuesCargaSocial - impuestoRenta;

    
    document.getElementById("salario-neto").innerText = salarioNeto;
    document.getElementById("carga-social").innerText = cargaSocial;
    document.getElementById("impuesto-renta").innerText = impuestoRenta;
}
