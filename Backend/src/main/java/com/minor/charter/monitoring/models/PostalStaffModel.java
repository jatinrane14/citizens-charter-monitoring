package com.minor.charter.monitoring.models;

import jakarta.persistence.Entity;

@Entity
public class PostalStaffModel extends UserBaseModel{
    private String employeeId;
    private String postOfficeName;
    private String branchCode;
    private String designation; // clerk, manager
    private String workingArea;

    private boolean isOnDuty;

    private int yearsOfExperience;

    public String getPostOfficeName() {
        return postOfficeName;
    }

    public void setPostOfficeName(String postOfficeName) {
        this.postOfficeName = postOfficeName;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getBranchCode() {
        return branchCode;
    }

    public void setBranchCode(String branchCode) {
        this.branchCode = branchCode;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getWorkingArea() {
        return workingArea;
    }

    public void setWorkingArea(String workingArea) {
        this.workingArea = workingArea;
    }

    public boolean isOnDuty() {
        return isOnDuty;
    }

    public void setOnDuty(boolean onDuty) {
        isOnDuty = onDuty;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }
}
