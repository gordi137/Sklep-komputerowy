<?php
session_start();

// Przykładowe produkty
$produkty = [
    1 => ['nazwa' => 'Produkt 1', 'cena' => 100],
    2 => ['nazwa' => 'Produkt 2', 'cena' => 150],
    3 => ['nazwa' => 'Produkt 3', 'cena' => 200],
];

// Inicjalizacja koszyka
if (!isset($_SESSION['koszyk'])) {
    $_SESSION['koszyk'] = [];
}

// Obsługa dodawania do koszyka
if (isset($_GET['dodaj'])) {
    $id = (int)$_GET['dodaj'];
    if (isset($produkty[$id])) {
        if (!isset($_SESSION['koszyk'][$id])) {
            $_SESSION['koszyk'][$id] = 0;
        }
        $_SESSION['koszyk'][$id]++;
    }
    header("Location: sklep.php");
    exit();
}

// Obsługa usuwania z koszyka
if (isset($_GET['usun'])) {
    $id = (int)$_GET['usun'];
    if (isset($_SESSION['koszyk'][$id])) {
        unset($_SESSION['koszyk'][$id]);
    }
    header("Location: sklep.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sklep Internetowy</title>
</head>
<body>
    <h1>Produkty</h1>
    <ul>
        <?php foreach ($produkty as $id => $produkt): ?>
            <li>
                <?php echo $produkt['nazwa']; ?> - <?php echo $produkt['cena']; ?> zł
                <a href="?dodaj=<?php echo $id; ?>">Dodaj do koszyka</a>
            </li>
        <?php endforeach; ?>
    </ul>

    <h2>Koszyk</h2>
    <ul>
        <?php foreach ($_SESSION['koszyk'] as $id => $ilosc): ?>
            <li>
                <?php echo $produkty[$id]['nazwa']; ?> (<?php echo $ilosc; ?> szt.) - <?php echo $produkty[$id]['cena'] * $ilosc; ?> zł
                <a href="?usun=<?php echo $id; ?>">Usuń</a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
