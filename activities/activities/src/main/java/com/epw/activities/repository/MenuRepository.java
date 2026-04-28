package com.epw.activities.repository;

import com.epw.activities.entity.Menu;
import com.epw.activities.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByRole(Role role);
}