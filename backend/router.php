<?php
session_start();

// Выполняем все из корня, чтобы конфиги были нагляднее
//chdir( "../" );

//print_r(getcwd());

require_once('inc/ExtDirect/API.php');
require_once('inc/ExtDirect/Router.php');

function autoloader($class){
     require_once 'inc/classes/' . $class . '.php'; 
}
spl_autoload_register('autoloader');

// this should alwasy be set but if its not, then execute api.php without outputting it
if(!isset($_SESSION['app-admin-ext-direct-state'])) {
    ob_start();
    include('api.php');
    ob_end_clean();
}

$api = new ExtDirect_API();
$api->setState($_SESSION['app-admin-ext-direct-state']);
  
$router = new ExtDirect_Router($api);
$router->dispatch();
$router->getResponse(true); // true to print the response instantly