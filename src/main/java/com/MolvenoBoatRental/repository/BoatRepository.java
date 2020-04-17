package com.MolvenoBoatRental.repository;


import com.MolvenoBoatRental.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoatRepository extends JpaRepository<Boat,Long > {
     Boat findOneByBoatNumberIgnoreCase(String boatNumber);
    }

