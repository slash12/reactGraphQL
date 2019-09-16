<?php

namespace App\Repository;

use App\Entity\BudgetTrack;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BudgetTrack|null find($id, $lockMode = null, $lockVersion = null)
 * @method BudgetTrack|null findOneBy(array $criteria, array $orderBy = null)
 * @method BudgetTrack[]    findAll()
 * @method BudgetTrack[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BudgetTrackRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BudgetTrack::class);
    }

    // /**
    //  * @return BudgetTrack[] Returns an array of BudgetTrack objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BudgetTrack
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
