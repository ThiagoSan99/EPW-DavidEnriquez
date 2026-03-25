package com.test1.test1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CourseRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotBlank(message = "Code is required")
    @Size(max = 50)
    private String code;

    private Integer credits;

    // Constructors
    public CourseRequest() {
    }

    public CourseRequest(String name, String description, String code, Integer credits) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.credits = credits;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }
}