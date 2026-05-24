package com.minor.charter.monitoring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "govt_official_model")
public class GovtOfficialModel extends UserBaseModel{
    // Official Information
    private String officialId;

    private String departmentName;

    private String officeName;

    private String designation;

    private String jurisdictionArea;

    // Monitoring Access
    private boolean canMonitorKPI;

    private boolean canHandleComplaints;

    private boolean canGenerateReports;

    // Office Details
    private String officeAddress;

    private String city;

    private String state;

    private String pincode;

    // Service Details
    private int yearsOfService;

    private boolean isOnDuty;

    // Access Level
    private String authorityLevel;

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }

    public String getOfficialId() {
        return officialId;
    }

    public void setOfficialId(String officialId) {
        this.officialId = officialId;
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

    public String getJurisdictionArea() {
        return jurisdictionArea;
    }

    public void setJurisdictionArea(String jurisdictionArea) {
        this.jurisdictionArea = jurisdictionArea;
    }

    public boolean isCanMonitorKPI() {
        return canMonitorKPI;
    }

    public void setCanMonitorKPI(boolean canMonitorKPI) {
        this.canMonitorKPI = canMonitorKPI;
    }

    public boolean isCanHandleComplaints() {
        return canHandleComplaints;
    }

    public void setCanHandleComplaints(boolean canHandleComplaints) {
        this.canHandleComplaints = canHandleComplaints;
    }

    public boolean isCanGenerateReports() {
        return canGenerateReports;
    }

    public void setCanGenerateReports(boolean canGenerateReports) {
        this.canGenerateReports = canGenerateReports;
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

    public int getYearsOfService() {
        return yearsOfService;
    }

    public void setYearsOfService(int yearsOfService) {
        this.yearsOfService = yearsOfService;
    }

    public boolean isOnDuty() {
        return isOnDuty;
    }

    public void setOnDuty(boolean onDuty) {
        isOnDuty = onDuty;
    }

    public String getAuthorityLevel() {
        return authorityLevel;
    }

    public void setAuthorityLevel(String authorityLevel) {
        this.authorityLevel = authorityLevel;
    }
}
