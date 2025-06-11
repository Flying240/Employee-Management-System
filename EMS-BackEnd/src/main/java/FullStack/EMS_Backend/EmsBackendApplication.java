package FullStack.EMS_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main Spring Boot Application class for EMS (Employee Management System).
 * Configures component scanning, entity scanning, and JPA repositories.
 */
@SpringBootApplication
@ComponentScan(basePackages = "FullStack")  // Scan all components in FullStack package
@EntityScan("FullStack.entity")            // Scan for JPA entities
@EnableJpaRepositories("FullStack.repository") // Enable JPA repositories
public class EmsBackendApplication {
    public static void main(String[] args) {
        try {
            SpringApplication.run(EmsBackendApplication.class, args);
            System.out.println("\n====== Employee Management System is now running! =====");
            System.out.println("====== Server started at: http://localhost:8080 ======");
            System.out.println("====== API endpoint: http://localhost:8080/api/employees ======\n");
        } catch (Exception e) {
            System.err.println("Application failed to start: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
