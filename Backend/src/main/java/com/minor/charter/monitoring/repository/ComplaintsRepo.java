package com.minor.charter.monitoring.repository;

import com.minor.charter.monitoring.models.ComplaintModel;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComplaintsRepo extends JpaRepository<ComplaintModel,String> {
    @Query("""
    SELECT c
    FROM ComplaintModel c
    ORDER BY c.createdAt DESC
""")
    List<ComplaintModel> getLatestComplaints(
            Pageable pageable
    );

    List<ComplaintModel> findByBranch_BranchCode(String branch);
}
