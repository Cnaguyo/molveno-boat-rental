package com.MolvenoBoatRental.model;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Trip {

    @Id
    @GeneratedValue
    private Long id;
    private double duration=0;
//    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime start_time;
//    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime end_time;
    private Integer numOfPersons;
    private Integer totalIncome;

    @ManyToOne
   // private List<Boat> boats = new ArrayList<>();
    private Boat boat;

    public Trip() {
    }

    public Trip(double duration, LocalDateTime start_time, LocalDateTime end_time, Integer numOfPersons, Integer totalIncome) {
        this.duration = duration;
        this.start_time = start_time;
        this.end_time = end_time;
        this.numOfPersons = numOfPersons;
        this.totalIncome = totalIncome;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
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

    public Integer getNumOfPersons() {
        return numOfPersons;
    }

    public void setNumOfPersons(Integer numOfPersons) {
        this.numOfPersons = numOfPersons;
    }

    public Integer getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Integer totalIncome) {
        this.totalIncome = totalIncome;
    }


    public Boat getBoat() {
        return boat;
    }

    public void setBoat(Boat boat) {
        this.boat = boat;
    }
}
