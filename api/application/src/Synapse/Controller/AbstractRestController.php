<?php

namespace Synapse\Controller;

use Symfony\Component\HttpFoundation\Response;

use View\AbstractView;

class AbstractRestController
{
    public function get()
    {
        return $this->notImplementedResponse();
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
