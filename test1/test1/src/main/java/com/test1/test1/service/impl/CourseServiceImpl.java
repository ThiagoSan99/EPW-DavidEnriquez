package com.test1.test1.service.impl;

import com.test1.test1.dto.CourseRequest;
import com.test1.test1.dto.CourseResponse;
import com.test1.test1.entity.Curso;
import com.test1.test1.entity.Instructor;
import com.test1.test1.repository.CursoRepository;
import com.test1.test1.repository.InstructorRepository;
import com.test1.test1.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public CourseResponse createCourse(CourseRequest request) {

        // 1. Instantiate entity
        Curso course = new Curso();

        // 2. Map DTO → Entity
        course.setName(request.getName());
        course.setDescription(request.getDescription());
        course.setCode(request.getCode());
        course.setCredits(request.getCredits());

        // 🔥 3. Validate and assign Instructor (NEW)
        if (request.getInstructorId() != null) {

            Instructor instructor = instructorRepository.findById(request.getInstructorId())
                    .orElseThrow(() -> new RuntimeException("Instructor not found"));

            course.setInstructor(instructor);
        }

        // 4. Save entity
        Curso savedCourse = cursoRepository.save(course);

        // 5. Return DTO response
        return mapToResponse(savedCourse);
    }

    @Override
    public List<CourseResponse> listCourses() {

        return cursoRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Mapper method (clean and reusable)
    private CourseResponse mapToResponse(Curso course) {
        return new CourseResponse(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.getCode(),
                course.getCredits()
        );
    }
}