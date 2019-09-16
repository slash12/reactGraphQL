<?php

namespace App\Controller;

use App\Entity\BudgetTrack;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class BudgetController extends Controller
{
    /**
     * Add amount to budget
     * @FOSRest\Post("/add/amount")
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function addAmount(Request $request)
    {
        // fetch request
        $request = $request->request->all();        
        // save new amount in db
        $b = new BudgetTrack();        

        // check if there is an amount in the request
        if (!isset($request[0]['amount'])) {
            return new JsonResponse([
                'hint' => 'Amount is missing',
                // 406
                'statusCode' => Response::HTTP_NOT_ACCEPTABLE,
            ]);
        }

        $amount = $request[0]['amount'];

        $b->setAmount($amount);
        // update db
        $em = $this->getDoctrine()->getManager();
        $em->persist($b);
        $em->flush();
        
        return new JsonResponse([
            'hint' => "Amount added to budget",
            // 200
            'statusCode' => Response::HTTP_OK
        ]);
    }
}
