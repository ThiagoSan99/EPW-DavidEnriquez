package com.epw.activities.controller;

import com.epw.activities.dto.*;
import com.epw.activities.entity.AppUser;
import com.epw.activities.repository.AppUserRepository;
import com.epw.activities.security.JwtService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppUserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(AppUserRepository userRepo,
                          PasswordEncoder encoder,
                          AuthenticationManager authManager,
                          JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {

        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            throw new RuntimeException("El username ya existe");
        }

        AppUser user = new AppUser();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));

        // 👇 Aquí puedes controlar el rol (por defecto USER)
        user.setRole(user.getRole() == null ? com.epw.activities.entity.Role.USER : user.getRole());

        userRepo.save(user);

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {

        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            req.getUsername(),
                            req.getPassword()
                    )
            );

            AppUser user = userRepo.findByUsername(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            String token = jwtService.generateToken(
                    user.getUsername(),
                    user.getRole().name()
            );

            return new AuthResponse(
                    token,
                    user.getUsername(),
                    user.getRole().name()
            );

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}