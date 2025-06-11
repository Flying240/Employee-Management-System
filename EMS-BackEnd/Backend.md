# EMS Backend (Employee Management System)

A simple, beginner-friendly Spring Boot backend for managing employees, using Spring Data JPA and MySQL.

---

## 🚀 Quick Start

1. **Generate Project**

   * Go to [start.spring.io](https://start.spring.io) and initialize a new Spring Boot project.
   * **Dependencies**:

     * **Spring Web**
     * **Spring Data JPA**
     * **MySQL Driver**
     * **Lombok**
2. **Unzip & Open**

   * Unzip the downloaded ZIP into your workspace.
   * Open it in your IDE (IntelliJ IDEA, VS Code, etc.).

---

## 🧩 Project Layers

```txt
Client (Postman / Frontend)
    ⇅
Controller Layer (DTOs)
    ⇅
Service Layer (Business Logic + Mapping)
    ⇅
Repository Layer (JPA Entities)
    ⇅
MySQL Database
```

1. **EmsBackendApplication**: Main Spring Boot class
2. **EmployeeEntity**: @Entity mapping to `employees` table
3. **EmployeeRepository**: Extends `JpaRepository` to expose CRUD methods
4. **EmployeeDto**: Simple POJO with `id`, `firstName`, `lastName`, `email`
5. **EmployeeMapper**: Converts between Entity ↔ DTO
6. **EmployeeService** + **Implementation**: Business logic, throws custom exceptions
7. **Exceptions**: `ResourceNotFoundException`, `ResourceConflictException`, etc.
8. **EmployeeController**: REST endpoints for CRUD operations

---

## ⚙️ Key Notes

* **Entity Scanning**: Spring Data JPA only creates tables when an entity is exposed via a `JpaRepository`.
* **DTO vs Entity**: DTOs are used only to transfer data; Entities represent database tables.
* **Error Handling**: Basic errors are handled in the backend (*404 Not Found*, *409 Conflict*, *400 Bad Request*, *500 Internal Server Error*). Frontend validation is recommended for user convenience.

> **Tip:** Avoid bypassing frontend validation (e.g., via Postman) if relying on lightweight backend checks.

---

## 📋 Endpoints

| Method | URL                   | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/employees`      | Create a new employee       |
| GET    | `/api/employees`      | Retrieve all employees      |
| GET    | `/api/employees/{id}` | Retrieve employee by ID     |
| PUT    | `/api/employees/{id}` | Update an existing employee |
| DELETE | `/api/employees/{id}` | Delete an employee          |

---

## 🔧 Configuration

* **`application.properties`**: Database URL, credentials, JPA settings.
* **`.env`** (Optional): Externalize sensitive configs using `dotenv-spring-boot` or environment variables.

Example `.env`:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/emsdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=Viki@3124
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

---

## 🎉 You're Ready!

Run with:

```bash
mvn spring-boot:run
```

Then interact via Postman or your frontend at `http://localhost:8080/api/employees`.

---