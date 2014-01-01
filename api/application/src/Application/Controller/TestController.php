<?php

namespace Application\Controller;

use Symfony\Component\HttpFoundation\Response;

use View\AbstractView;

class TestController extends AbstractRestController
{
    public function get()
    {
        return json_encode('yo');
    }

    public function post()
    {
        return $this->notImplementedResponse();
    }

    public function put()
    {
        return $this->notImplementedResponse();
    }

    public function delete()
    {
        return $this->notImplementedResponse();
    }

    public function head()
    {
        return $this->notImplementedResponse();
    }

    private function notImplementedResponse()
    {
        $response = new Response();
        $response->setStatusCode(501);
        return $response;
    }
}
