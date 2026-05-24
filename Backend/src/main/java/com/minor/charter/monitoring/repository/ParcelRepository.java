package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.ParcelsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ParcelRepository extends JpaRepository<ParcelsModel,Long> {
    ParcelsModel findByTrackingId(String trackingId);

    List<ParcelsModel> findByCreatedAtBetween(LocalDateTime localDateTime, LocalDateTime localDateTime1);
}
