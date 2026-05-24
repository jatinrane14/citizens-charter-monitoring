package com.minor.charter.monitoring.models;

import jakarta.persistence.Entity;

@Entity
public class AdminModel extends UserBaseModel{
    private String adminId;

    private String departmentName;

    private String designation;

    // Access & Permissions
    private boolean canManageUsers;

    private boolean canManageBranches;

    private boolean canManageComplaints;

    private boolean canMonitorKPI;

    private boolean canGenerateReports;

    private boolean canManageParcels;

    // Office Details
    private String officeName;

    private String officeAddress;

    private String city;

    private String state;

    private String pincode;

    // Work Details
    private int yearsOfExperience;

    private boolean isSuperAdmin;

//    Getters & setters
    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public boolean isCanManageUsers() {
        return canManageUsers;
    }

    public void setCanManageUsers(boolean canManageUsers) {
        this.canManageUsers = canManageUsers;
    }

    public boolean isCanManageBranches() {
        return canManageBranches;
    }

    public void setCanManageBranches(boolean canManageBranches) {
        this.canManageBranches = canManageBranches;
    }

    public boolean isCanManageComplaints() {
        return canManageComplaints;
    }

    public void setCanManageComplaints(boolean canManageComplaints) {
        this.canManageComplaints = canManageComplaints;
    }

    public boolean isCanMonitorKPI() {
        return canMonitorKPI;
    }

    public void setCanMonitorKPI(boolean canMonitorKPI) {
        this.canMonitorKPI = canMonitorKPI;
    }

    public boolean isCanGenerateReports() {
        return canGenerateReports;
    }

    public void setCanGenerateReports(boolean canGenerateReports) {
        this.canGenerateReports = canGenerateReports;
    }

    public boolean isCanManageParcels() {
        return canManageParcels;
    }

    public void setCanManageParcels(boolean canManageParcels) {
        this.canManageParcels = canManageParcels;
    }

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public boolean isSuperAdmin() {
        return isSuperAdmin;
    }

    public void setSuperAdmin(boolean superAdmin) {
        isSuperAdmin = superAdmin;
    }
}
