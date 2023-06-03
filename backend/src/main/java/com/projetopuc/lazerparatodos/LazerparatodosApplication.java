package com.projetopuc.lazerparatodos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class LazerparatodosApplication {

	public static void main(String[] args) {
		SpringApplication.run(LazerparatodosApplication.class, args);
	}

}
