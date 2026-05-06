package com.epw.activities.service;

import com.epw.activities.entity.Menu;
import com.epw.activities.entity.Role;
import com.epw.activities.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final MenuRepository repo;

    public MenuService(MenuRepository repo) {
        this.repo = repo;
    }

    public List<Menu> getMenuByRole(Role role) {
        return repo.findByRole(role);
    }
}