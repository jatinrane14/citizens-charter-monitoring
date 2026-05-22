package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.PostalBranchModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostalBranchRepo extends JpaRepository<PostalBranchModel,String> {
    public PostalBranchModel findByBranchCode(String branchCode);
}
