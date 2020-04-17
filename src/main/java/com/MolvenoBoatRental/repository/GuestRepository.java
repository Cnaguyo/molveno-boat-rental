package com.MolvenoBoatRental.repository;


import com.MolvenoBoatRental.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest,Long> {
    Guest findOneByGuestNameIgnoreCase(String name);

}
