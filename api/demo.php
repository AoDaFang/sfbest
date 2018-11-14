<?php

$path = str_replace('\\', '/', dirname(__DIR__));
 
echo str_replace($_SERVER['DOCUMENT_ROOT'], "http://".$_SERVER['HTTP_HOST'], $path);
 