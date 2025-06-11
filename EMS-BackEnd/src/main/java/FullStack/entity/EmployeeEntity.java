package FullStack.entity;

// * Employee entity class representing the 'employees' table in the database.
// * Uses Lombok annotations to generate boilerplate code at compile-time.
//! Lombok (@Data, @Getter, etc.), which auto-generates getters and setters at compile-time.
// lastName -> getLastName(), setLastName().
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//! Jakrata provides a set of APIs and specifications for building enterprise-level Java applications,
//  especially for:
// Web apps, REST APIs, Backend services, Cloud-native apps
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;
}