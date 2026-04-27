package com.epw.activities.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.epw.activities.entity.AppUser;
import com.epw.activities.entity.Role;
import com.epw.activities.repository.AppUserRepository;

@Configuration
public class DataInitializer {

    @Value("${app.admin.username}")
    private String adminUser;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner initAdmin(AppUserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findByUsername(adminUser).isEmpty()) {
                AppUser admin = new AppUser();
                admin.setUsername(adminUser);
                admin.setPassword(encoder.encode(adminPassword));
                admin.setRole(Role.ADMIN);

                repo.save(admin);
            }
        };
    }
}