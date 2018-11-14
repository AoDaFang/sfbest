<?php
/*
 * 接口说明：
 * 请求类型：GET
 * 请求参数：无
 * 返回值形式：
 *  {
 *      //一级分类
 *      "1" : {
 *          "cid":1
            "cname":家用电器
            "pid":0
            "path":0,
            //一级下面所有的二级分类
            "children" : {
                "13" : {
                    "cid": 13,
                    "cname":"电视",
                    "pid":1,
                    "path":"0,1,",
                    //二级下面所有的三级分类
                    "children" : {
                        "97" : {
                            "cid" : 97,
                            "cname": "液晶电视",
                            "pid":13,
                            "path":"0,1,13,",
                        },
                        "99: : {
                            "cid" : 99,
                            "cname": "平板",
                            "pid":13,
                            "path":"0,1,13,",
                        },

                    },
                },
                "14" : {
                    "cid":	14
                    "cname":"空调"
                    "pid":"1"
                    "path":"0,1,",
                    "children" : [],
                }, 

            },
        }
        "2": {
            "cid":1
            "cname":家用电器
            "pid":0
            "path":0,
            "children":[],      //children如果为空 则表示没有子类
        },
 *  }
 *       
 */

header("Content-Type:text/html;charset=utf-8");
date_default_timezone_set("PRC");
error_reporting(E_NOTICE);

try {

    $pdo = new PDO("mysql:host=localhost;dbname=shop;charset=utf8", "root", "", [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

} catch (PDOException $ex) {

    exit(json_encode([
        "errorCode" => 1001,
        "errMsg" => $ex->getMessage(),
    ]));

}

$rows = $pdo->query("SELECT * FROM shop_cate order by CONCAT(path, cid)")->fetchAll();



/**
 * [
 *      "1" => [
 *          
 *          "children" => [
 *              "13" => [
 * 
 *              ],
 *              "14" => [],
 *              "children" => [
 * 
 *              ],
 *          ],
 *      ],
 *      "2" => [],
 *      "3" => [],
 * 
 * 
 * 
 * ]
 * 
 * 
 */
$cats = Array();
foreach ($rows as $key => $row) {
    //创建该分类的子节点
    $row["children"] = Array();

    //以分类编号作为索引存储
    if ($row["pid"] == 0 && $row["path"] == "0,") {//根类
        $cats[$row["cid"]] = $row;

    } else {
        //找到该分类的路径  例如 1,13,95,""
        $path = explode(",", $row["path"]);
        $str = "\$cats";
        for ($i = 1; $i < count($path) - 1; $i++) {
            $str .= "['{$path[$i]}']['children']";
        }
        $str .= "['{$row['cid']}']=\$row;";
        eval($str);
    }
}
exit(json_encode($cats));