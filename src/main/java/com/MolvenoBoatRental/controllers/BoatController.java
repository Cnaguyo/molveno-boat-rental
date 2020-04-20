package com.MolvenoBoatRental.controllers;

import com.MolvenoBoatRental.model.Boat;
import com.MolvenoBoatRental.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/boats")
public class BoatController {

    @Autowired//connect to database
    private BoatRepository boatRepository;

    @GetMapping
    public List<Boat> getBoats() {
        return boatRepository.findAll();
    }

    @PostMapping
    public String addBoat(@RequestBody Boat boat) {
        Boat existingBoat = boatRepository.findOneByBoatNumberIgnoreCase(boat.getBoatNumber());
        if (existingBoat != null) {
            return "The boat number " + boat.getBoatNumber() + " already exists. Please set another number.";
        }
        boat.setAvailable(true);
        boatRepository.save(boat);
        return "boat is created..";
    }

    @DeleteMapping("/{id}")
    public void deleteBoat(@PathVariable Long id) {
        boatRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateBoat(@PathVariable("id") Long id, @RequestBody Boat boat) {
        boat.setId(id);
        boatRepository.save(boat);
    }

    @GetMapping("/{noOfPersons}")
    public Boat findSuitableBoats(@PathVariable Integer noOfPersons) {
          //  List<Boat> myList = new ArrayList<>();
            List<Boat> allBoats = boatRepository.findAll();
        for (Boat allBoat : allBoats) {
            if (allBoat.getMaxSeats() >= noOfPersons) {
                //  myList.add(allBoats.get(i));
                return allBoat;
            }
        }
           return  null;
    }

}

