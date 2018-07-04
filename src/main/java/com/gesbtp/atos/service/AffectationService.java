package com.gesbtp.atos.service;

import com.gesbtp.atos.domain.Affectation;
import com.gesbtp.atos.repository.AffectationRepository;
import com.gesbtp.atos.repository.search.AffectationSearchRepository;
import com.gesbtp.atos.service.dto.AffectationDTO;
import com.gesbtp.atos.service.mapper.AffectationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Affectation.
 */
@Service
@Transactional
public class AffectationService {

    private final Logger log = LoggerFactory.getLogger(AffectationService.class);

    private final AffectationRepository affectationRepository;

    private final AffectationMapper affectationMapper;

    private final AffectationSearchRepository affectationSearchRepository;

    public AffectationService(AffectationRepository affectationRepository, AffectationMapper affectationMapper, AffectationSearchRepository affectationSearchRepository) {
        this.affectationRepository = affectationRepository;
        this.affectationMapper = affectationMapper;
        this.affectationSearchRepository = affectationSearchRepository;
    }

    /**
     * Save a affectation.
     *
     * @param affectationDTO the entity to save
     * @return the persisted entity
     */
    public AffectationDTO save(AffectationDTO affectationDTO) {
        log.debug("Request to save Affectation : {}", affectationDTO);
        Affectation affectation = affectationMapper.toEntity(affectationDTO);
        affectation = affectationRepository.save(affectation);
        AffectationDTO result = affectationMapper.toDto(affectation);
        affectationSearchRepository.save(affectation);
        return result;
    }

    /**
     * Get all the affectations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AffectationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Affectations");
        return affectationRepository.findAll(pageable)
            .map(affectationMapper::toDto);
    }

    /**
     * Get one affectation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public AffectationDTO findOne(Long id) {
        log.debug("Request to get Affectation : {}", id);
        Affectation affectation = affectationRepository.findOneWithEagerRelationships(id);
        return affectationMapper.toDto(affectation);
    }

    /**
     * Delete the affectation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Affectation : {}", id);
        affectationRepository.delete(id);
        affectationSearchRepository.delete(id);
    }

    /**
     * Search for the affectation corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AffectationDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Affectations for query {}", query);
        Page<Affectation> result = affectationSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(affectationMapper::toDto);
    }

    /**
     * Get all the chantiers.
     *
     * @param id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Affectation> findAllChantier(Long id) {
        log.debug("Request to get all Chantiers");
        return affectationRepository.findAffectationByChantierAndId(id);
    }

    /**
     * Get all the chantiers.
     *
     * @param id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Affectation> findAllTravaux(Long id) {
        log.debug("Request to get all Chantiers");
        return affectationRepository.findAffectationByTravauxAndId(id);
    }
}
