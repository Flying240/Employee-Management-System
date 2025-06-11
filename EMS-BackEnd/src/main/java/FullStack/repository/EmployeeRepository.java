//!Spring Data JPA only starts entities when you expose a JpaRepository.
// The act of scanning repositories tells Hibernate to inspect your @Entity classes and apply DDL.

// What you do	                    What Spring does
// Just create @Entity class	    ❌ Spring might ignore it (won’t create table)
// Create a JpaRepository for it	✅ Spring scans your entity and generates the SQL table

package FullStack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import FullStack.entity.EmployeeEntity;

// This interface extends JpaRepository, which provides CRUD operations for the Employee entity.
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {

    //! Spring Data JPA provides a default implementation for the JpaRepository interface
    //?  — this implementation is called SimpleJpaRepository.
    
    // !When you define a JpaRepository interface, Spring Data JPA automatically generates the implementation at runtime using SimpleJpaRepository.
    // ? This saves you from writing the boring CRUD code yourself. You just autowire and use it.

    // !SimpleJpaRepository is annontaed with:
    // ?@Repository = Detect the class during component scanning.
    // ?@Transactional = This ensures that all methods in the repository run inside a transaction by default.
    //          (Transactions mean: all DB operations in a method are treated as a single unit — either all succeed or all fail (rolled back).)

    EmployeeEntity findByEmail(String email);
}