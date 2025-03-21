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

while (true) {
    $id = count($_SESSION['transacciones']) + 1;
    $descripcion = $_POST['descripcion'];
    $monto = $_POST['monto'];
    registrarTransaccion($id, $descripcion, $monto);
    break;
}

function GenerarEstadoDeCuenta() {
    $totalSinImpuestos = 0;

    echo "<table>
            <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Precio</th>
            </tr>";

    foreach ($_SESSION['transacciones'] as $varTemporal) {
        echo "<tr>
                <td>{$varTemporal['id']}</td>
                <td>{$varTemporal['descripcion']}</td>
                <td>" . number_format($varTemporal['monto'], 2) . "</td>
              </tr>";
        $totalSinImpuestos += $varTemporal['monto'];
    }

    echo "</table>";

    $interes = $totalSinImpuestos * 0.026;
    $cashback = $totalSinImpuestos * 0.001;
    $TotalConImpuestos = $totalSinImpuestos + $interes - $cashback;

    echo "<h2>-------------------------------------------------------------------------------------------------</h2>";
    echo "<p>Total sin impuestos: " . number_format($totalSinImpuestos, 2) . "</p>";
    echo "<p>Interes: " . number_format($interes, 2) . "</p>";
    echo "<p>Cashback : " . number_format($cashback, 2) . "</p>";
    echo "<p>Total con impuestos y cashback: " . number_format($TotalConImpuestos, 2) . "</p>";

    $archivo = fopen("estado_cuenta.txt", "w");
    fwrite($archivo, "Estado de Cuenta\n");
    foreach ($_SESSION['transacciones'] as $varTemporal) {
        fwrite($archivo, "ID: {$varTemporal['id']} - {$varTemporal['descripcion']} - Precio: " . number_format($varTemporal['monto'], 2) . "\n");
    }
    fwrite($archivo, "-------------------------------------------------------------------------------------------------\n");
    fwrite($archivo, "Total sin impuestos: " . number_format($totalSinImpuestos, 2) . "\n");
    fwrite($archivo, "Interes: " . number_format($interes, 2) . "\n");
    fwrite($archivo, "Cashback : " . number_format($cashback, 2) . "\n");
    fwrite($archivo, "Total con impuestos y cashback:" . number_format($TotalConImpuestos, 2) . "\n");
    fclose($archivo);
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <form method="POST">
        <label for="descripcion">Descripcion:</label>
        <input type="text" name="descripcion" required>
        <label for="monto">Precio:</label>
        <input type="number" name="monto" step="0.01" required>
        <button type="submit">Enviar</button>
    </form>

    <h2>-------------------------------------------------------------------------------------------------</h2>>

    <?php GenerarEstadoDeCuenta(); ?>

</body>
</html>