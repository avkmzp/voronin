<?php
session_start();
if (!$_SESSION['password']) {
    unset($_SESSION['password']);
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <title>ГБ (ГерпетоБаза)</title>
    <link href="https://fonts.googleapis.com/css?family=El+Messiri" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>

<main>
    <img src="/images/pithon.png" alt="Питоны">
    <img src="/images/elaphe.png" alt="Полозы">
    <img src="/images/abronia.png" alt="Абронии">
    <img src="/images/eublepharis.png" alt="Эублефары">
    <img src="/images/lanthanotus.png" alt="Лантанотусы">
    <img src="/images/shinizaurus.png" alt="Шинизавры">
    <img id="logo" src="/images/logo.svg" alt="Ворон">
    <nav>
        <ul id="nav">
            <li><a href="#">Животные</a>
                <ul>
                    <li><a href="#">Учетные</a></li>
                    <li><a href="#">Домашние</a></li>
                    <li><a href="#">Планируемые</a></li>
                </ul>
            </li>
            <li>
                <a href="visitorsTab.php">Посещения</a>
                <!--                <ul>-->
                <!--                    <li><a href="#">Пункт 1</a></li>-->
                <!--                    <li><a href="#">Пункт 2</a></li>-->
                <!--                    <li><a href="#">Пункт 3</a></li>-->
                <!--                </ul>-->
            </li>
            <li><a href="#">И еще...</a>
                <ul>
                    <li><a href="#">Пункт 1</a></li>
                    <li><a href="old.php">Old</a></li>
                    <li><a href="#">Пункт 3</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</main>
<!--<footer>-->
<!--    А.Н. Воронин<br>2017-->
<!--</footer>-->
</body>
</html>