package com.boat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class BoatDTO {
	private long id;
	private String nom;
	private String description;
}
