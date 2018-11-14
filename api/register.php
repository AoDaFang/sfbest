<?php

header("Content-Type:text/html;charset=utf-8");

error_reporting(E_ERROR);

date_default_timezone_set("Asia/Shanghai");

/**
 * 
 * 用户注册接口页面
 * 
 * 请求方式：POST
 * 
 * 请求参数：
 *         uname :  用户账号
 *         password : 登陆密码
 *         avatar : 头像图片
 * 
 * 返回值：
 *         数据类型 json 字符串
 *         字段列表：
 *         errorCode ：错误码
 *              0    没有错误发生 头像上传成功
 *              1000 没有发生错误 但头像未上传
 *              1001 数据库链接错误
 *              1002 账号已被占用
 *              2001 账号入库错误
 *              2002 头像入库错误 
 *              3001 头像格式错误
 *              3002 头像大小错误
 *              3003 转移文件错误
 *         info :     注册的新用户信息
 *         attach :   附加的提示信息
 *         
 *              
 */

$uname = trim($_POST['uname']);
$password = trim($_POST['password']);

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

//有效性验证


//真实性验证
if ($pdo->query("SELECT * FROM shop_users WHERE uname='{$uname}'")->rowCount()) {
    exit(json_encode([
        "errorCode" => 1002,
        "attach" => "账号已被占用",
    ]));
}

//自动完成
$password = md5($password);

//添加记录到数据库
if (false !== $pdo->exec("INSERT INTO shop_users SET uname='{$uname}', password = '{$password}'")) {

    $insert_id = $pdo->lastInsertId();

    $user_rec = $pdo->query("SELECT `uname`, `password` FROM shop_users WHERE uid = {$insert_id}")->fetch();

    $file = $_FILES['uface'];

    //判断是否有头像传入
    if ($file['size'] != 0) {
        
        //重命名文件 关联一个日期时间
        $extension = strtolower(array_pop(explode(".", $file["name"])));

        //检测文件类型是否合法
        if (!in_array($extension, ["jpg", "jpeg", "png", "gif"])) {
            exit(json_encode([
                "errorCode" => 3001,
                "attach" => "头像格式不正确",
                "info" => $user_rec,
            ]));
        }
        //判断上传文件大小限制
        if ($file["size"] > 2 * 1024 * 1024) {
            exit(json_encode([
                "errorCode" => 3002,
                "attach" => "文件大小超出2M",
                "info" => $user_rec,
            ]));
        }
        $rename = date("YmdHis") . rand(10, 99) . "." . $extension;

        $app_path = str_replace('\\', '/', dirname(__DIR__));
        $url_path = str_replace($_SERVER['DOCUMENT_ROOT'], "http://" . $_SERVER['HTTP_HOST'], $app_path);
        
        if (!is_dir($saveroot = $app_path."/public/uploads/")) mkdir($saveroot, 0777, true);

        $destination = $saveroot . $rename;

        //将文件由临时目录转移到存储地址
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            $uface = $url_path . "/public/uploads/" . $rename;
            if (false !== $affects = $pdo->exec("UPDATE shop_users SET `uface` = '{$img}' WHERE uid = {$insert_id}")) {
                $user_rec->uface = $uface;
                exit(json_encode([
                    "errorCode" => 0,
                    "info" => $user_rec,
                ]));
            } else {
                exit(json_encode([
                    "errorCode" => 2002,
                    "attach" => "头像入库发生错误",
                    "info" => $user_rec,
                ]));
            }

        } else {
            exit(json_encode([
                "errorCode" => 3003,
                "attach" => "转移文件发生错误",
                "info" => $user_rec,
            ]));
        }

    } else {
        exit(json_encode([
            "errorCode" => 1000,
            "attach" => "无头像上传",
            "info" => $user_rec,
        ]));
    }

} else {
    exit(json_encode([
        "errorCode" => 2001,
        "attach" => $pdo->errorInfo(),
    ]));
}