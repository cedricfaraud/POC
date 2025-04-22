package com.ycyw.your_car_your_way_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ycyw.your_car_your_way_app.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
