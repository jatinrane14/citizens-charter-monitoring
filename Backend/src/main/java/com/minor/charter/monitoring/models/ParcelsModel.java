package com.minor.charter.monitoring.models;

import com.minor.charter.monitoring.enums.ParcelStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class ParcelsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // =========================
    // Tracking Information
    // =========================

    @Column(unique = true, nullable = false)
    private String trackingId;

    private String parcelType;

    private String deliveryType;

    @Enumerated(EnumType.STRING)
    private ParcelStatus status;

    private int currentStep;
    // =========================
    // Sender Information
    // =========================

    private String senderName;

    private long senderPhone;

    private String senderAddress;

    private String senderCity;

    private String senderState;

    private String senderPincode;

    // =========================
    // Receiver Information
    // =========================

    private String receiverName;

    private long receiverPhone;

    private String receiverAddress;

    private String receiverCity;

    private String receiverState;

    private String receiverPincode;

    // =========================
    // Parcel Details
    // =========================

    private double weight;

    private double parcelValue;

    private String specialInstructions;

    // =========================
    // Payment Details
    // =========================

    private double bookingAmount;

    private String paymentMethod;

    // =========================
    // Delivery Information
    // =========================

    private LocalDate expectedDeliveryDate;

    private LocalDate deliveredDate;

    // =========================
    // Citizen Mapping (Optional)
    // Some users may not use app
    // =========================

    @ManyToOne
    @JoinColumn(name = "citizen_id", nullable = true)
    private CitizenModel citizen;

    // =========================
    // Staff Mapping
    // Clerk who created entry
    // =========================

    @ManyToOne
    @JoinColumn(name = "created_by",referencedColumnName = "employeeId")
    private PostalStaffModel createdBy;

    // =========================
    // Branch Mapping
    // =========================

    @ManyToOne
    @JoinColumn(name = "branch_code",referencedColumnName = "branchCode")
    private PostalBranchModel branch;

    // =========================
    // Audit Fields
    // =========================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if(this.status == null) {
            this.status = ParcelStatus.BOOKED;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

//    Getter and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public String getParcelType() {
        return parcelType;
    }

    public void setParcelType(String parcelType) {
        this.parcelType = parcelType;
    }

    public String getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(String deliveryType) {
        this.deliveryType = deliveryType;
    }

    public ParcelStatus getStatus() {
        return status;
    }

    public int getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(int currentStep) {
        this.currentStep = currentStep;
    }

    public void setStatus(ParcelStatus status) {
        this.status = status;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public long getSenderPhone() {
        return senderPhone;
    }

    public void setSenderPhone(long senderPhone) {
        this.senderPhone = senderPhone;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public String getSenderCity() {
        return senderCity;
    }

    public void setSenderCity(String senderCity) {
        this.senderCity = senderCity;
    }

    public String getSenderState() {
        return senderState;
    }

    public void setSenderState(String senderState) {
        this.senderState = senderState;
    }

    public String getSenderPincode() {
        return senderPincode;
    }

    public void setSenderPincode(String senderPincode) {
        this.senderPincode = senderPincode;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public long getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(long receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public String getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    public String getReceiverCity() {
        return receiverCity;
    }

    public void setReceiverCity(String receiverCity) {
        this.receiverCity = receiverCity;
    }

    public String getReceiverState() {
        return receiverState;
    }

    public void setReceiverState(String receiverState) {
        this.receiverState = receiverState;
    }

    public String getReceiverPincode() {
        return receiverPincode;
    }

    public void setReceiverPincode(String receiverPincode) {
        this.receiverPincode = receiverPincode;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getParcelValue() {
        return parcelValue;
    }

    public void setParcelValue(double parcelValue) {
        this.parcelValue = parcelValue;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public double getBookingAmount() {
        return bookingAmount;
    }

    public void setBookingAmount(double bookingAmount) {
        this.bookingAmount = bookingAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(LocalDate expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public LocalDate getDeliveredDate() {
        return deliveredDate;
    }

    public void setDeliveredDate(LocalDate deliveredDate) {
        this.deliveredDate = deliveredDate;
    }

    public CitizenModel getCitizen() {
        return citizen;
    }

    public void setCitizen(CitizenModel citizen) {
        this.citizen = citizen;
    }

    public PostalStaffModel getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(PostalStaffModel createdBy) {
        this.createdBy = createdBy;
    }

    public PostalBranchModel getBranch() {
        return branch;
    }

    public void setBranch(PostalBranchModel branch) {
        this.branch = branch;
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
