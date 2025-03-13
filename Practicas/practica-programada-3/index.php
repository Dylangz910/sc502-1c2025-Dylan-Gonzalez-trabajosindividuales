<?php
session_start();
if (!isset($_SESSION['transacciones'])) {
    $_SESSION['transacciones'] = [];
}

function registrarTransaccion($id, $descripcion, $monto) {
    $_SESSION['transacciones'][] = [
        "id" => $id,
        "descripcion" => $descripcion,
        "monto" => floatval($monto)
    ];
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = count($_SESSION['transacciones']) + 1;
    $descripcion = $_POST['descripcion'];
    $monto = $_POST['monto'];

    if (!empty($descripcion) && is_numeric($monto) && $monto > 0) {
        registrarTransaccion($id, $descripcion, $monto);
    }
}

function generarEstadoDeCuenta() {
    $transacciones = $_SESSION['transacciones'];
    $totalContado = 0;

    echo "<h2>Estado de Cuenta</h2>";
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Monto (₡)</th>
            </tr>";

    foreach ($transacciones as $t) {
        echo "<tr>
                <td>{$t['id']}</td>
                <td>{$t['descripcion']}</td>
                <td>" . number_format($t['monto'], 2) . "</td>
              </tr>";
        $totalContado += $t['monto'];
    }

    echo "</table>";

    $interes = $totalContado * 0.026;
    $cashback = $totalContado * 0.001;
    $montoFinal = $totalContado + $interes - $cashback;

    echo "<h3>Resumen</h3>";
    echo "<p>Total Contado: ₡" . number_format($totalContado, 2) . "</p>";
    echo "<p>Monto con 2.6% de Interés: ₡" . number_format($interes, 2) . "</p>";
    echo "<p>Cashback (0.1%): ₡" . number_format($cashback, 2) . "</p>";
    echo "<p><strong>Monto Final a Pagar: ₡" . number_format($montoFinal, 2) . "</strong></p>";













    $archivo = fopen("estado_cuenta.txt", "w");
    fwrite($archivo, "Estado de Cuenta\n====================\n");
    foreach ($transacciones as $t) {
        fwrite($archivo, "ID: {$t['id']} - {$t['descripcion']} - Monto: ₡" . number_format($t['monto'], 2) . "\n");
    }
    fwrite($archivo, "\nResumen:\n");
    fwrite($archivo, "Total Contado: ₡" . number_format($totalContado, 2) . "\n");
    fwrite($archivo, "Monto con 2.6% de Interés: ₡" . number_format($interes, 2) . "\n");
    fwrite($archivo, "Cashback (0.1%): ₡" . number_format($cashback, 2) . "\n");
    fwrite($archivo, "Monto Final a Pagar: ₡" . number_format($montoFinal, 2) . "\n");
    fclose($archivo);
}

?>










<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estado de Cuenta</title>
</head>
<body>

    <h1>Registro de Transacciones</h1>

    <form method="POST">
        <label for="descripcion">Descripción:</label>
        <input type="text" name="descripcion" required>
        <label for="monto">Monto (₡):</label>
        <input type="number" name="monto" step="0.01" required>
        <button type="submit">Registrar Transacción</button>
    </form>

    <hr>

    <?php generarEstadoDeCuenta(); ?>

</body>
</html>