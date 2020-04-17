package com.MolvenoBoatRental.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Boat {

        @Id
        @GeneratedValue
        private Long id;
        private String boatType;
        private  Integer maxSeats;
        private  String boatNumber;
        private Integer minimumPrice;
        private Integer actualPrice;
        private Boolean isAvailable;

        @OneToMany(mappedBy = "boat")
        @JsonIgnore
        private List<Trip> trips = new ArrayList<>();

        public Boat() {
        }

        public Boat(String boatType, Integer maxSeats, String boatNumber, Integer minimumPrice, Integer actualPrice, Boolean isAvailable, List<Trip> trips) {
                this.boatType = boatType;
                this.maxSeats = maxSeats;
                this.boatNumber = boatNumber;
                this.minimumPrice = minimumPrice;
                this.actualPrice = actualPrice;
                this.isAvailable = isAvailable;
                this.trips = trips;
        }


        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getBoatType() {
                return boatType;
        }

        public void setBoatType(String boatType) {
                this.boatType = boatType;
        }

        public Integer getMaxSeats() {
                return maxSeats;
        }

        public void setMaxSeats(Integer maxSeats) {
                this.maxSeats = maxSeats;
        }

        public String getBoatNumber() {
                return boatNumber;
        }

        public void setBoatNumber(String boatNumber) {
                this.boatNumber = boatNumber;
        }

        public Integer getMinimumPrice() {
                return minimumPrice;
        }

        public void setMinimumPrice(Integer minimumPrice) {
                this.minimumPrice = minimumPrice;
        }

        public Integer getActualPrice() {
                return actualPrice;
        }

        public void setActualPrice(Integer actualPrice) {
                this.actualPrice = actualPrice;
        }

        public Boolean getAvailable() {
                return isAvailable;
        }

        public void setAvailable(Boolean available) {
                isAvailable = available;
        }

        public List<Trip> getTrips() {
                return trips;
        }

        public void setTrips(List<Trip> trips) {
                this.trips = trips;
        }
}
