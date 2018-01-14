<?php

/**
 * Created by PhpStorm.
 * User: AVK
 * Date: 04.02.2017
 * Time: 13:23
 */
class DBase
{
    const DB_NAME = 'database/db.sql3';
    public function __construct()
    {
        echo "Rkflskdjflsl";
        $db = new SQLite3(self::DB_NAME);
        $db->query("INSERT INTO users (name, password) VALUES ('Маша1', 'Игуана')");
    }
}