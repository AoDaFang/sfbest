<?php

header("Content-Type:text/html;charset=utf-8");

error_reporting(E_ERROR);

date_default_timezone_set("Asia/Shanghai");

/**
 * 登陆验证接口页面
 * 
 * 请求方式：   GET
 * 
 * 请求参数：   uname   用户账号    需要经过url编码
 *             password 登陆密码    
 * 返回值：
 *          errorCode   错误码
 *                 0    登陆成功
 *                 1001 数据库链接错误
 *                 1002 账号不存在
 *                 1003 密码不正确
 *          info 错误提示信息 或 登陆成功时的一条用户记录
 * 
 */
$uname = urldecode($_GET['uname']);
$password = urldecode($_GET['password']);

//初始化数据库工具
try {
    $pdo = new PDO("mysql:host=localhost;dbname=shop;charset=utf8;", "root", "root", [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    ]);
} catch (PDOException $ex) {
    exit(json_encode([
        "errorCode" => 1001,
        "attach" => $ex->getMessage(),
    ]));
}

$userRec = $pdo->query("SELECT * FROM shop_users WHERE uname= '{$uname}';")->fetch();
if (empty($userRec)) {
    $result = [
        "errorCode" => 1002,
        "info" => "账号不存在",
    ];
} else if ($userRec->password != md5($password)) {
    $result = [
        "errorCode" => 1003,
        "info" => "密码不正确",
    ];
} else {
    $result = [
        "errorCode" => 0,
        "info" => $userRec
    ];
}

exit(json_encode($result));