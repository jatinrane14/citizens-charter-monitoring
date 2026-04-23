package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.PostalStaffModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostalStaffRepository extends JpaRepository<PostalStaffModel,String> {

}