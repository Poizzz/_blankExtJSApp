<?php
session_start();

// Выполняем все из корня, чтобы конфиги были нагляднее
//chdir( "../" );

//print_r(getcwd());

require_once('inc/ExtDirect/API.php');
require_once('inc/ExtDirect/CacheProvider.php');

//$cache = new ExtDirect_CacheProvider('inc/cache/api_cache.txt');
$api = new ExtDirect_API();

$api->setRouterUrl('backend/router.php'); 
//$api->setCacheProvider($cache);
$api->setNamespace('Ext.RPC');
$api->setDescriptor('Ext.RPC.APIDesc');
$api->setDefaults(array(
    'autoInclude' => true,
    'basePath' => 'inc/classes'
));

$api->add([
	'Utils',
    'Config',
	'Auth',
    'UpdateRM',
    'UpdateWeb'
]);

$api->output();

$_SESSION['app-admin-ext-direct-state'] = $api->getState();

?>