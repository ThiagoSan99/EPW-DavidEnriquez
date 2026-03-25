package com.test1.test1.repository;

import com.test1.test1.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

    // Custom query example
    Optional<Curso> findByCode(String code);

}