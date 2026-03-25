package com.test1.test1.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "instructor")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // 🔥 One instructor → many courses
    @OneToMany(mappedBy = "instructor")
    private List<Curso> courses;

    // Constructors
    public Instructor() {}

    public Instructor(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Lifecycle
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public List<Curso> getCourses() { return courses; }

    public void setId(Long id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setCourses(List<Curso> courses) { this.courses = courses; }
}