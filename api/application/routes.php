<?php

$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new Synapse\Provider\ServiceRestControllerServiceProvider());

$app['index.controller'] = $app->share(function () use ($app) {
    return new \Application\Controller\IndexController;
});

$app->get('/', 'index.controller:indexAction');

$app->error(function (\Exception $e, $code) {
    return new Symfony\Component\HttpFoundation\Response('Something went wrong with your request');
});
