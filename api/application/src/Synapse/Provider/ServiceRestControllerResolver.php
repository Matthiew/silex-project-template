<?php

namespace Synapse\Provider;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ControllerResolverInterface;
use Synapse\Rest\Exception\MethodNotImplementedException;

/**
 * Enables name_of_service:rest syntax for declaring controllers.
 *
 * @link http://silex.sensiolabs.org/doc/providers/service_controller.html
 */
class ServiceRestControllerResolver implements ControllerResolverInterface
{
    const SERVICE_PATTERN = "/[A-Za-z0-9\._\-]+:rest/";

    protected $resolver;
    protected $app;

    /**
     * Constructor.
     *
     * @param ControllerResolverInterface $resolver A ControllerResolverInterface instance to delegate to
     * @param Application                 $app      An Application instance
     */
    public function __construct(ControllerResolverInterface $resolver, Application $app)
    {
        $this->resolver = $resolver;
        $this->app = $app;
    }

    /**
     * {@inheritdoc}
     */
    public function getController(Request $request)
    {
        $controller = $request->attributes->get('_controller', null);

        if (!is_string($controller) || !preg_match(static::SERVICE_PATTERN, $controller)) {
            return $this->resolver->getController($request);
        }

        $service = str_replace(':rest', '', $controller);

        if (!isset($this->app[$service])) {
            throw new \InvalidArgumentException(sprintf('Service "%s" does not exist.', $service));
        }

        $method = $request->getMethod();

        if (!method_exists($this->app[$service], $method)) {
            throw new MethodNotImplementedException(sprintf('HTTP method "%s" has not been implemented in service "%s"', $method, $service));
        }

        return array($this->app[$service], $method);
    }

    /**
     * {@inheritdoc}
     */
    public function getArguments(Request $request, $controller)
    {
        return $this->resolver->getArguments($request, $controller);
    }
}
