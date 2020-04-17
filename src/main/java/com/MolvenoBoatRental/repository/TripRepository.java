package com.MolvenoBoatRental.repository;

import com.MolvenoBoatRental.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip,Long> {
}
