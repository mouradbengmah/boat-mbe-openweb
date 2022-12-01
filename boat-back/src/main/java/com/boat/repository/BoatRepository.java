package com.boat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boat.model.Boat;

@Repository
public interface BoatRepository extends JpaRepository<Boat,Long> {

}
