package com.epw.activities.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // clave interna (customers, tmo, etc)

    @Column(nullable = false)
    private String content; // texto visible

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // ADMIN o USER

    // 🔹 Constructores
    public Menu() {}

    public Menu(String name, String content, Role role) {
        this.name = name;
        this.content = content;
        this.role = role;
    }

    // 🔹 Getters y Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getContent() {
        return content;
    }

    public Role getRole() {
        return role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}