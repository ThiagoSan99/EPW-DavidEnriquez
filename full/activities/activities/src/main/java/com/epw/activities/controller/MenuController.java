package com.epw.activities.controller;

import com.epw.activities.entity.Menu;
import com.epw.activities.entity.Role;
import com.epw.activities.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService service;

    public MenuController(MenuService service) {
        this.service = service;
    }

    @GetMapping("/{role}")
    public List<Menu> getMenu(@PathVariable Role role) {
        return service.getMenuByRole(role);
    }
}