<?php

// Arreglo de transacciones
$transacciones = [
    ["id" => 1, "descripcion" => "seguro", "monto" => 20000],
    ["id" => 2, "descripcion" => "uber", "monto" => 7000],
    ["id" => 3, "descripcion" => "alquiler", "monto" => 2500000]
    
];

// Función para registrar una transacción
function registrarTransaccion($descripcion, $monto) {
    global $transacciones;
    static $currentId = 4; 

    // Validar que los datos sean correctos
    if (!is_string($descripcion) || !is_numeric($monto)) {
        echo "Error: Datos inválidos.\n";
        return;
    }

    // Agregar la nueva transacción
    array_push($transacciones, ["id" => $currentId, "descripcion" => $descripcion, "monto" => $monto]);
    $currentId++; 
    echo "Transacción registrada correctamente.\n";
}

// Función para generar estado de cuenta
function generarEstadoDeCuenta() {
    global $transacciones;
    $total = 0;

    // Mostrar detalle de cada transacción y sumar montos
    echo "Detalles de las transacciones:\n";
    foreach ($transacciones as $transaccion) {
        echo "ID: " . $transaccion["id"] . ", Descripción: " . $transaccion["descripcion"] . ", Monto: " . $transaccion["monto"] . "\n";
        $total += $transaccion["monto"];
    }

    // Calcular montos adicionales
    $interes = $total * 0.026; 
    $cashback = $total * 0.001; 
    $totalConInteres = $total + $interes;
    $totalFinal = $totalConInteres - $cashback;

    // Mostrar resumen de montos
    echo "\nResumen:\n";
    echo "Monto total de contado: " . $total . "\n";
    echo "Monto total con intereses: " . $totalConInteres . "\n";
    echo "Cashback: " . $cashback . "\n";
    echo "Monto final a pagar: " . $totalFinal . "\n";
}


registrarTransaccion("carniceria", 10000); 
registrarTransaccion("escuela", 90000); 
registrarTransaccion("supermercado", 65000); 
registrarTransaccion("combustible", 25000); 
registrarTransaccion("gimnasio", 30000); 
registrarTransaccion("café", 5000); 
generarEstadoDeCuenta(); 

?>
