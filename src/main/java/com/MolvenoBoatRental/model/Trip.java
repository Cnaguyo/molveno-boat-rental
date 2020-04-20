package com.MolvenoBoatRental.model;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Trip {

    @Id
    @GeneratedValue
    private Long id;
    private Long duration=0L;
//    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime start_time;
//    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime end_time;
    private Long totalPrice=0L;
    private boolean tripEnded;
    private String status;

    @ManyToOne
   // private List<Boat> boats = new ArrayList<>();
    private Boat boat;

    public Trip() {
    }

    public Trip(LocalDateTime start_time, String status) {
        this.start_time = start_time;
        this.status = status;
    }

    public Trip(boolean tripEnded) {
        this.tripEnded = tripEnded;
    }


    public boolean isTripEnded() {
        return tripEnded;
    }

    public void setTripEnded(boolean tripEnded) {
        this.tripEnded = tripEnded;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public LocalDateTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalDateTime start_time) {
        this.start_time = start_time;
    }

    public LocalDateTime getEnd_time() {
        return end_time;
    }

    public void setEnd_time(LocalDateTime end_time) {
        this.end_time = end_time;
    }



    public Boat getBoat() {
        return boat;
    }

    public void setBoat(Boat boat) {
        this.boat = boat;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
