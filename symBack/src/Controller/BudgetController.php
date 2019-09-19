<?php

namespace App\Controller;

use App\Entity\BudgetTrack;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
        if (!isset($request['amount'])) {
            return new JsonResponse([
                'hint' => 'Amount is missing',
                // 406
                'statusCode' => Response::HTTP_NOT_ACCEPTABLE,
            ]);
        }

        $amount = $request['amount'];

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

     /**
     * Lists all amount entries in the budget.
     * @FOSRest\Get("/list/amount")
     *
     * @return JsonResponse
     */
    public function getBudgetAmounts()
    {
        $repository = $this->getDoctrine()->getRepository(BudgetTrack::class);
        // find all amount with timestamps
        $amountEntries = $repository->getAmounts();

        // no amount found
        if (count($amountEntries) === 0 || null == $amountEntries) {
            return new JsonResponse([
                'hint' => 'No amount entries found',
                // 404
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        }     

        return new JsonResponse($amountEntries);
    }

       /**
     * Update an amount by id
     * @FOSRest\Put("/update/amount/{id}")
     * 
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateBudgetById(Request $request, $id)
    {
        $request = $request->request->all();        
        $budgetRepo = $this->getDoctrine()->getRepository(BudgetTrack::class);
        $bTrack = $budgetRepo->find($id);

        if (null == $bTrack) {
            return new JsonResponse([
                'hint' => 'No amount entry is found',
                // 404
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        }        

        // update article
        if (null != $request['amount']) {
            $bTrack->setAmount($request['amount']);
            $em = $this->getDoctrine()->getManager();
            $em->persist($bTrack);
            $em->flush();
        } else {
            return new JsonResponse([
                'hint' => 'Amount request value is missing',
                // 406
                'statusCode' => Response::HTTP_NOT_ACCEPTABLE
            ]);
        }

        return new JsonResponse([
            // 202
            'statusCode' => Response::HTTP_ACCEPTED,
            'hint'     => 'The article is updated'
        ]);
    }

    /**
     * Get an amount by id
     * @FOSRest\Get("/amount/{id}")
     *
     * @return JsonResponse
     */
    public function getBudgetActionById($id)
    {        
        $repository = $this->getDoctrine()->getRepository(BudgetTrack::class);
        // find budget by id
        $bTrack = $repository->getAmountById($id);                        

        return new JsonResponse($bTrack);
    }
}
