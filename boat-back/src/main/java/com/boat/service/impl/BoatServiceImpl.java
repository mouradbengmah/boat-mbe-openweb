package com.boat.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.boat.dto.BoatDTO;
import com.boat.model.Boat;
import com.boat.repository.BoatRepository;
import com.boat.service.BoatService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoatServiceImpl implements BoatService{
	private final BoatRepository boatRepository;

    @Override
    @Transactional
    public List<Boat> recupererLesBateaux() {
        List<Boat> boatList = new ArrayList<>();
        boatRepository.findAll().forEach(boatList::add);
        return boatList;
    }

    @Override
    @Transactional
    public Optional<Boat> recupererUnBateauParId(Long id) {
        return boatRepository.findById(id);
    }

    @Override
    @Transactional
    public Boat enregistrerUnBateau(BoatDTO boatDTO) {
        return boatRepository.save(convertDTOToBoat(boatDTO));
    }

    @Override
    @Transactional
    public Boat modifierUnBateau(Boat ancienBoat, BoatDTO boatDTO) {
    	ancienBoat.setNom(boatDTO.getNom());
    	ancienBoat.setDescription(boatDTO.getDescription());
        return boatRepository.save(ancienBoat);
    }

    @Override
    @Transactional
    public void supprimerUnBateau(Boat boat) {
        boatRepository.delete(boat);
    }

    private Boat convertDTOToBoat(BoatDTO boatDTO){
        Boat boat = new Boat();
        boat.setNom(boatDTO.getNom());
        boat.setDescription(boatDTO.getDescription());
        return boat;
    }
}
