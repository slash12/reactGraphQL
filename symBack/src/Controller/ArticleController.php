<?php

namespace App\Controller;

use App\Entity\Article;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ArticleController extends Controller
{
    /**
     * Create Article
     * @FOSRest\Post("/article")
     *
     * @return JsonResponse
     */
    public function postArticleAction(Request $request)
    {        
        $request = $request->request->all();
        $article = new Article();
        $article->setName($request['name']);
        $article->setDescription($request['description']);
        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        return new JsonResponse([
            // 201
            'statusCode' => Response::HTTP_CREATED,
            'txtMsg' => 'Article created',
        ]);
    }

    /**
     * Lists all Articles.
     * @FOSRest\Get("/articles")
     *
     * @return Response
     */
    public function getArticleAction()
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $this->getDoctrine()->getRepository(Article::class);
        // find all articles
        $articles = $repository->findall();
        // convert result into json
        $jsonArticles = $serializer->serialize($articles, 'json');        

        return new Response($jsonArticles);
    }

    /**
     * Get an article by id
     * @FOSRest\Get("/article/{id}")
     *
     * @return Response
     */
    public function getArticleActionById($id)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $repository = $this->getDoctrine()->getRepository(Article::class);
        // find article by id
        $article = $repository->find($id);
        // convert result into json
        $jsonArticle = $serializer->serialize($article, 'json');        

        return new Response($jsonArticle);
    }

    /**
     * Update an article by id
     * @FOSRest\Put("/article/{id}")
     * 
     * @param int $id
     * @param Request $request
     */
    public function updateArticleById(Request $request, $id)
    {        
        $request = $request->request->all();
        $articleRepo = $this->getDoctrine()->getRepository(Article::class);
        $article = $articleRepo->find($id);

        if (null == $article) {
            return new JsonResponse([
                // 404
                'status' => Response::HTTP_NOT_FOUND
            ]);
        }        

        // update article
        if (null != $request['name']) {
            $article->setName($request['name']);
        }
        
        if (null != $request['description']) {
            $article->setDescription($request['description']);
        }
        
        if (null != $request['name'] || null != $request['description']) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();
        }

        return new JsonResponse([
            // 202
            'statusCode' => Response::HTTP_ACCEPTED,
            'txtMsg'     => 'The article is updated'
        ]);
    }

    /**
     * Delete an article
     * @FOSRest\Delete("/article/{id}")
     *
     * @param int $id
     * 
     * @return JsonResponse
     */
    public function deleteArticle($id)
    {
        $articleRepo = $this->getDoctrine()->getRepository(Article::class);
        $article = $articleRepo->find($id);

        if (null == $article) {
            return new JsonResponse([
                // 404
                'status' => Response::HTTP_NOT_FOUND
            ]);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($article);
        $em->flush();

        return new JsonResponse([
            // 202
            'statusCode' => Response::HTTP_ACCEPTED,
            'txtMsg'     => 'This article is deleted'
        ]);
    }
}
