package com.gesbtp.atos.repository;

import com.gesbtp.atos.domain.LigneFacture;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LigneFacture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneFactureRepository extends JpaRepository<LigneFacture, Long> {

}
