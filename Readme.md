# Employee Management System

## 📋 Introduction
Employee Management System (EMS) is a full-stack web application built using React and Spring Boot. It enables organizations to efficiently manage employee data through a user-friendly interface. The system supports basic CRUD operations with robust error handling and responsive design.

### Key Features
- Employee data management
- Intuitive user interface
- Real-time validation
- Error handling
- RESTful API integration
- Responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js & npm (v16+)
- Java 17 or higher
- MySQL (v8.0+)
- Maven (v3.8+)

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE emsdb;
```

2. Configure database:
   - Navigate to `/EMS-BackEnd/src/main/resources/`
   - Update `application.properties` with your credentials:
```properties
spring.datasource.url=MYSQL_DB_URL
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Running the Application

1. **Backend:**
```bash
cd EMS-BackEnd
mvn clean install
mvn spring-boot:run
```

2. **Frontend:**
```bash
cd EMS-FrontEnd
npm install
npm run dev
```

## 🛠️ Technology Stack

### Frontend
- **Core:** React.js with Vite
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Styling:** Bootstrap 5
- **Development:** VS Code

### Backend
- **Framework:** Spring Boot 3
- **ORM:** Spring Data JPA
- **Database:** MySQL
- **Build Tool:** Maven
- **Security:** Spring Security
- **Documentation:** Swagger/OpenAPI

## 📐 System Architecture

```
graph TD
    subgraph Frontend[Frontend Layer]
        A[React Components] --> B[Context API]
        B --> C[Services Layer]
        C --> D[Axios Client]
    end
    
    subgraph Backend[Backend Layer]
        E[Controllers] --> F[Services]
        F --> G[Repositories]
        G --> H[(MySQL)]
    end
    
    D <-->|REST API| <--> E
```
```
Frontend(React.JS):

    (Router)  (Components) (Services)
         Axios HTTP library
           ^           |
           | (Consumes)|
           | Rest APIs |    #(Lossely Coupled)
           | (Exposes) |
           |           >
        Spring REST Controller
    (Model) (Service) (DAO Repositry) <-> MySQL Database  
Backend(SpringBoot.Java):
```

## 🔄 Application Flow

### Frontend Workflow
- **Components:** UI elements and user interaction
- **Context:** Global state and error management
- **Services:** API integration and data handling
- **Utils:** Helper functions and constants

### Backend Workflow
- **Controllers:** Handle HTTP requests
- **DTOs:** Data transfer objects
- **Services:** Business logic
- **Entities:** Database models
- **Repositories:** Data access layer
