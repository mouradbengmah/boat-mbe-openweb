package com.boat.service;

import java.util.List;
import java.util.Optional;

import com.boat.dto.BoatDTO;
import com.boat.model.Boat;

public interface BoatService {

	List<Boat> recupererLesBateaux();

    Optional<Boat> recupererUnBateauParId(Long id);

    Boat enregistrerUnBateau(BoatDTO boatDto);

    Boat modifierUnBateau(Boat ancienBateau, BoatDTO nouveauBateau);

    void supprimerUnBateau(Boat bateau);

}
