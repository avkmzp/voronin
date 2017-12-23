<?php

/**
 * Created by PhpStorm.
 * User: AVK
 * Date: 04.02.2017
 * Time: 13:23
 */
class DBase
{
    const DB_NAME = 'database/voronin.db';

    public function __construct()
    {
        echo "Rkflskdjflsl";
        $db = new SQLite3(DB_NAME);
        $dateTime = time();
        $ip = $_SERVER['REMOTE_ADDR'];
        $results = $db->query("INSERT INTO visitors (ip, time) VALUES ($ip, $dateTime)");
    }
}