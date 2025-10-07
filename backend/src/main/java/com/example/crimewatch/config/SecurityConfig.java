package com.example.crimewatch.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // allow cross-origin requests (CORS). Configure more specifically if needed.
            .cors(Customizer.withDefaults())
            // disable CSRF for API usage (if you use cookies/sessions consider enabling CSRF)
            .csrf(csrf -> csrf.disable())
            // allow H2 console frames
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
            .authorizeHttpRequests(auth -> auth
                // public endpoints
                .requestMatchers("/api/auth/**", "/h2-console/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                // everything else requires authentication (adjust as needed)
                .anyRequest().authenticated()
            );

        return http.build();
    }

    // Expose a PasswordEncoder bean for your user service to hash passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
