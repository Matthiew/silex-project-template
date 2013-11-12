<?php

$app->register(new Silex\Provider\ServiceControllerServiceProvider());

$app['index.controller'] = $app->share(function () use ($app) {
    return new \Controller\IndexController;
});

$app->get('/', 'index.controller:indexAction');
