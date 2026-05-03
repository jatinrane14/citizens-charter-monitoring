package com.minor.charter.monitoring.models;

import jakarta.persistence.Entity;

@Entity
public class CitizenModel extends UserBaseModel{
    private String address;
    private String city;
    private String state;
    private String pincode;

    private String aadhaarNumber; // optional

    private int totalServicesUsed;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotalServicesUsed() {
        return totalServicesUsed;
    }

    public void setTotalServicesUsed(int totalServicesUsed) {
        this.totalServicesUsed = totalServicesUsed;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
