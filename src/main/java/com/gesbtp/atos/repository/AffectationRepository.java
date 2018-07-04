package com.gesbtp.atos.repository;

import com.gesbtp.atos.domain.Affectation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Affectation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long> {
    @Query("select distinct affectation from Affectation affectation left join fetch affectation.employes")
    List<Affectation> findAllWithEagerRelationships();

    @Query("select affectation from Affectation affectation left join fetch affectation.employes where affectation.id =:id")
    Affectation findOneWithEagerRelationships(@Param("id") Long id);


    @Query("select distinct affectation from Affectation affectation left join fetch affectation.employes where affectation.chantier.id=:id")
    List<Affectation> findAffectationByChantierAndId(@Param("id") Long id);


    @Query("select affectation from Affectation affectation left join fetch affectation.employes where affectation.travaux.id=:id")
    List<Affectation> findAffectationByTravauxAndId(@Param("id") Long id);

}
