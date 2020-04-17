package com.MolvenoBoatRental.controllers;



import com.MolvenoBoatRental.model.Guest;
import com.MolvenoBoatRental.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {

    @Autowired
    private GuestRepository guestRepository;

    @GetMapping
    public List<Guest> getGuests() {
        return guestRepository.findAll();

}
////    @GetMapping("/search")
////    public Guest getGuest(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName) {
////        return guestRepository.findOneByFirstNameAndLastNameIgnoreCase(firstName, lastName);


    @GetMapping("/{id}")
    public Guest getGuest(@PathVariable Long id) {
        return guestRepository.findById(id).get();
    }
    @PostMapping
    public Long addGuest(@RequestBody Guest guest) {
        Guest existingGuest = guestRepository.findOneByNameIgnoreCase(guest.getName());
        if (existingGuest!= null) {
            return existingGuest.getId();

        }
        return guestRepository.save(guest).getId();
    }

    @DeleteMapping("/{id}")
    public void deleteGuest(@PathVariable Long id) {
        guestRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateGuest(@PathVariable("id") Long id, @RequestBody Guest guest) {
        guest.setId(id);
        guestRepository.save(guest);
}
    }


