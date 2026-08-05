package com.purva.studentcrm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.enums.Role;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);

    List<User> findByRole(Role role);
    List<User> findByApprovalStatus(String approvalStatus);
}