package com.test1.test1.service;

import com.test1.test1.dto.CourseRequest;
import com.test1.test1.dto.CourseResponse;

import java.util.List;

public interface CourseService {

    CourseResponse createCourse(CourseRequest request);

    List<CourseResponse> listCourses();
}