package com.minor.charter.monitoring.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Entity
public class ComplaintModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // Complaint Details
    private String complaintId;

    private String complaintType;
    // DELAYED_DELIVERY / DAMAGED_PARCEL / LOST_PARCEL

    @Column(length = 1000)
    private String description;

    private String priority;
    // LOW / MEDIUM / HIGH / CRITICAL

    private String status;
    // OPEN / IN_PROGRESS / RESOLVED / ESCALATED

    // Parcel Reference
    private String trackingId;

    // Citizen Details
    @ManyToOne
    @JoinColumn(name = "citizen_id")
    private CitizenModel citizen;


    // Branch Details
    @ManyToOne
    @JoinColumn(
            name = "branch_code",
            referencedColumnName = "branchCode"
    )
    private PostalBranchModel branch;

    // Resolution Details
    @Column(length = 1000)
    private String resolutionNotes;

    private LocalDateTime resolvedAt;

    // Complaint Dates
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(String complaintId) {
        this.complaintId = complaintId;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public CitizenModel getCitizen() {
        return citizen;
    }

    public void setCitizen(CitizenModel citizen) {
        this.citizen = citizen;
    }

    public PostalBranchModel getBranch() {
        return branch;
    }

    public void setBranch(PostalBranchModel branch) {
        this.branch = branch;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
