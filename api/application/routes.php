<?php

$app->register(new Silex\Provider\ServiceControllerServiceProvider());

$app['index.controller'] = $app->share(function () use ($app) {
    return new \Controller\IndexController;
});

$app['rpc.controller'] = $app->share(function() use ($app) {
	return new \Controller\RpcController;
});

$app->get('/', 'index.controller:indexAction');
$app->get('rpc', 'rpc.controller:execute');

$app->error(function (\Exception $e, $code) {
	return new Symfony\Component\HttpFoundation\Response('Something went wrong with your request');
});