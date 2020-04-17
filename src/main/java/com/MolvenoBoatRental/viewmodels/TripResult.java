package com.MolvenoBoatRental.viewmodels;

public class TripResult {
    private long minutes;
    private long price;

    public TripResult(long minutes, long price) {
        this.minutes = minutes;
        this.price = price;
    }

    public long getMinutes() {
        return minutes;
    }

    public void setMinutes(long minutes) {
        this.minutes = minutes;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }
    // TODO: Craete getters, setters, and optionally a constructor.
}
