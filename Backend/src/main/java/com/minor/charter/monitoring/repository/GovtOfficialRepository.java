package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.GovtOfficialModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovtOfficialRepository extends JpaRepository<GovtOfficialModel,String> {
}
