package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.GovtOfficialModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovtOfficialRepository extends JpaRepository<GovtOfficialModel,String> {
    UserBaseModel findByUserName(String userName);

    UserBaseModel findByUserEmail(String userEmail);
}
