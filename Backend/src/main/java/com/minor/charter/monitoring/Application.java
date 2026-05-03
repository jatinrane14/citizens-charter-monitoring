package com.minor.charter.monitoring;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    @Value("${spring.datasource.url}")
    private String url;
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);


	}
    @PostConstruct
    public void print() {
        System.out.println("DB URL: " + url);
    }

}
