package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminModel,String> {

}