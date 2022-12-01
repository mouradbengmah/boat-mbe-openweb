package com.boat.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boat.dto.BoatDTO;
import com.boat.model.Boat;
import com.boat.service.BoatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/boat")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class BoatController {
	private final BoatService boatService;

	@GetMapping("/")
	public ResponseEntity<?> getAllBoats() {
		try {
			return new ResponseEntity<>(boatService.recupererLesBateaux(), HttpStatus.OK);
		} catch (Exception e) {
			return errorResponse();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getBoat(@PathVariable Long id) {
		try {
			Optional<Boat> optBoat = boatService.recupererUnBateauParId(id);
			if (optBoat.isPresent()) {
				return new ResponseEntity<>(optBoat.get(), HttpStatus.OK);
			} else {
				return noBoatFoundResponse(id);
			}
		} catch (Exception e) {
			return errorResponse();
		}
	}

	@PostMapping("/")
	public ResponseEntity<?> createBoat(@RequestBody BoatDTO boatDTO) {
		try {
			return new ResponseEntity<>(boatService.enregistrerUnBateau(boatDTO), HttpStatus.CREATED);
		} catch (Exception e) {
			return errorResponse();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateBoat(@PathVariable Long id, @RequestBody BoatDTO boatDTO) {
		try {
			Optional<Boat> optBoat = boatService.recupererUnBateauParId(id);
			if (optBoat.isPresent()) {
				return new ResponseEntity<>(boatService.modifierUnBateau(optBoat.get(), boatDTO), HttpStatus.OK);
			} else {
				return noBoatFoundResponse(id);
			}
		} catch (Exception e) {
			return errorResponse();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBoat(@PathVariable Long id) {
		try {
			Optional<Boat> optBoat = boatService.recupererUnBateauParId(id);
			if (optBoat.isPresent()) {
				boatService.supprimerUnBateau(optBoat.get());
				return new ResponseEntity<>(String.format("Bateau : %d supprimé", id), HttpStatus.OK);
			} else {
				return noBoatFoundResponse(id);
			}
		} catch (Exception e) {
			return errorResponse();
		}
	}

	private ResponseEntity<String> errorResponse() {
		return new ResponseEntity<>("Erreur serveur :(", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private ResponseEntity<String> noBoatFoundResponse(Long id) {
		return new ResponseEntity<>("Aucun bateau trouvé avec l'id: " + id, HttpStatus.NOT_FOUND);
	}
}
