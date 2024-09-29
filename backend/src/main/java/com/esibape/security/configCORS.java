package com.esibape.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class configCORS implements WebMvcConfigurer {
	
	 	@Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:3000")
	                .allowedOrigins("http://192.168.1.6:8081")
	                .allowedOrigins("http://127.0.0.1:8081")
	                .allowedOrigins("http://localhost:8081")
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
	                .exposedHeaders("Authorization")
	                .allowCredentials(true)
	                .maxAge(3600); // Tempo de cache para CORS preflight requests (solicitações OPTIONS)
	    
	 	}

}
