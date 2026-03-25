package com.test1.test1.controller;

import com.test1.test1.entity.Instructor;
import com.test1.test1.repository.InstructorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorRepository instructorRepository;

    // ✅ CREATE INSTRUCTOR
    @PostMapping
    public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor) {

        if (instructor.getName() == null || instructor.getEmail() == null) {
            return ResponseEntity.badRequest().build();
        }

        Instructor saved = instructorRepository.save(instructor);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // ✅ GET ALL INSTRUCTORS
    @GetMapping
    public ResponseEntity<List<Instructor>> listInstructors() {
        return ResponseEntity.ok(instructorRepository.findAll());
    }
}