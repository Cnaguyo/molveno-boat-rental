package com.MolvenoBoatRental.controllers;

import com.MolvenoBoatRental.model.Boat;
import com.MolvenoBoatRental.model.Trip;
import com.MolvenoBoatRental.repository.BoatRepository;
import com.MolvenoBoatRental.repository.TripRepository;
import com.MolvenoBoatRental.viewmodels.TripResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TripController {


    @Autowired//connect to database
    private TripRepository tripRepository;

    @Autowired
    private BoatRepository boatRepository;

    @GetMapping("/trips")
    public List<Trip> getTrip() {
        return tripRepository.findAll();
    }

    @PostMapping("/trips")
    public void addTrip(@RequestBody Trip trip) {
        trip.setStart_time(LocalDateTime.now());
        Boat boat = trip.getBoat();
        boat.setAvailable(false);
        tripRepository.save(trip);
        boatRepository.save(boat);

    }

    @DeleteMapping("/trips/{id}")
    void deleteTrip(@PathVariable Long id) {
        tripRepository.deleteById(id);
    }

    @PutMapping("/trips/{id}")
    public void updateTrip(@PathVariable("id") Long id, @RequestBody Trip trip) {
        trip.setId(id);
        tripRepository.save(trip);
    }
//1. POST to /api/trips/start. This will start a trip, and set the starting_time to LocalDateTime.now.
//2. PUT to /api/trips/stop. This will end the trip and set the stopping_time to LocalDateTime.now
    @PostMapping("/trips/start")
    public void startTrip(@RequestBody Trip trip){
       // trip.setStart_time(LocalDateTime.now());
        tripRepository.save(trip);

    }
    @PutMapping("/trips/end/{id}")
    public TripResult endTrip(@PathVariable("id")Long id){
        Trip trip = tripRepository.getOne(id);
        trip.setEnd_time(LocalDateTime.now());
        tripRepository.save(trip);
        // 1. Calculate duration
        Duration duration = Duration.between(trip.getStart_time(), trip.getEnd_time());
//         Convert it to seconds / minutes, or anything else
        long seconds = duration.getSeconds();
        long minutes = seconds / 60;
//        2. Determine price based on the duration
        long price = (trip.getBoat().getActualPrice() * minutes) / 60;
        trip.setDuration(minutes);
        trip.setTotalPrice(price);
        return new TripResult(minutes,price);
    }

}




