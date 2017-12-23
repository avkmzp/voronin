<?php
session_start();
if (!$_SESSION['password']) {
    unset($_SESSION['password']);
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Старая _версия</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            background-image: url("images/grass.png");
            display: flex;
            justify-content: center;
            align-items: center;
        }

        div {
            width: 83.84vw;
            height: 16vw;
            border: 2px #006d00 solid;
            background-image: url("images/header.svg");
            background-color: #98ad13;
            background-size: 100% auto;
        }
    </style>
</head>
<body>
<a href="home.php">
    <div></div>
</a>
</body>
</html>