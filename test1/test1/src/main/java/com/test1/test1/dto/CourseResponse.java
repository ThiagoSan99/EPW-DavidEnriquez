package com.test1.test1.dto;

public class CourseResponse {

    private Long id;
    private String name;
    private String description;
    private String code;
    private Integer credits;

    // Constructors
    public CourseResponse() {
    }

    public CourseResponse(Long id, String name, String description, String code, Integer credits) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.code = code;
        this.credits = credits;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getCode() {
        return code;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}