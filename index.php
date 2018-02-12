<?php
const NAME_OF_SERVER = 'growinghome.ru';
if ($_SERVER['HTTP_HOST'] == NAME_OF_SERVER and !$_SERVER['HTTPS']) {
    header('Location: https://' . NAME_OF_SERVER . '/');
}
?>
<!DOCTYPE html>
<html lang='ru-RU'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta name='theme-color' content='#98ad13'>
    <title>Тренировочная зона</title>
    <link rel='stylesheet' href='styles/style.css?=001'>
    <link rel='icon' href='favicon.ico'>
</head>
<body>
<div>
    <div class='tri'>
        <a href='timer.html'>Таймер</a>
    </div>
    <div class='tri'>
        <a href='users.html' target='_blank'>План</a>
    </div>
    <!--<div class='tri'>-->
    <!--<a href='fitnestimer.html'>Таймер</a>-->
    <!--</div>-->
</div>
</body>
</html>