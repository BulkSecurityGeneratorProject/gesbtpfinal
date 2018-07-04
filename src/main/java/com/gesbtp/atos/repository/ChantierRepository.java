package com.gesbtp.atos.repository;

import com.gesbtp.atos.domain.Chantier;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Chantier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChantierRepository extends JpaRepository<Chantier, Long> {

    @Query(value = "select chantier from Chantier chantier where chantier.client.id=:id")
    List<Chantier> findByClientId(@Param("id") Long id);

    @Query(value = "select chantier from Chantier chantier where chantier.client in (select client from Client client where client.entreprise.id=:id)")
    List<Chantier> findChantierEntrprise(@Param("id") Long id);
}
