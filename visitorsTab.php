<?php
/**
 * Created by PhpStorm.
 * User: AVK
 * Date: 04.02.2017
 * Time: 23:25
 */
session_start();
if (!$_SESSION['password']) {
    unset($_SESSION['password']);
    header('Location: index.php');
}
$db = new SQLite3('database/voronin.db');
$sql = "SELECT ip, time, result FROM visitors ORDER BY id DESC LIMIT 9";
$results = $db->query($sql);
$row = $results->fetchArray(SQLITE3_ASSOC);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <!--    <meta name="viewport"-->
    <!--          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">-->
    <!--    <meta http-equiv="X-UA-Compatible" content="ie=edge">-->
    <title>ГБ (ГерпетоБаза)</title>
    <link href="https://fonts.googleapis.com/css?family=El+Messiri" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>
<main>
    <a href="home.php"><img id="logo" src="/images/logo.svg" alt="Ворон"></a>
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
    <table>
        <tr>
            <td>ip</td>
            <td>Дата</td>
            <td>Время</td>
            <td>Верный пароль</td>
        </tr>
        <?php
        while ($row) {
            echo '<tr>';
            echo '<td>' . $row['ip'] . '</td>';
            echo '<td>' . date("d-m-Y", $row['time']) . '</td>';
            echo '<td>' . date("H:i:s", $row['time']) . '</td>';
            echo '<td>' . ($row['result'] ? 'Да' : 'Нет') . '</td>';
            echo '</tr>';
            $row = $results->fetchArray(SQLITE3_ASSOC);
        }
        unset($db);
        ?>
    </table>
</main>
</body>
</html>
