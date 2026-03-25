package com.test1.test1.controller;

import com.test1.test1.dto.CourseRequest;
import com.test1.test1.dto.CourseResponse;
import com.test1.test1.service.CourseService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // ✅ CREATE COURSE
    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @Valid @RequestBody CourseRequest request) {

        CourseResponse response = courseService.createCourse(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ✅ LIST ALL COURSES
    @GetMapping
    public ResponseEntity<List<CourseResponse>> listCourses() {

        List<CourseResponse> courses = courseService.listCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}