package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.ParcelsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelRepository extends JpaRepository<ParcelsModel,Long> {
}
