package com.epw.activities.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.epw.activities.dto.MenuOption;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @GetMapping("/{role}")
    public List<MenuOption> getMenu(@PathVariable String role) {

        if (role.equals("ADMIN")) {
            return List.of(
                new MenuOption("customers", "Customers"),
                new MenuOption("departaments", "Departaments"),
                new MenuOption("tmo", "TMO"),
                new MenuOption("about", "About")
            );
        }

        return List.of(
            new MenuOption("tmo", "TMO"),
            new MenuOption("about", "About")
        );
    }
}