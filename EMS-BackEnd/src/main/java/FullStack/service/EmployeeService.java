package FullStack.service;

import java.util.List;

import FullStack.dto.EmployeeDto;

// Client (Postman or frontend)
//         ⇅
// Controller Layer (uses DTOs to receive/send data)
//         ⇅
// Service Layer (converts DTO ↔ Entity)
//         ⇅
// Repository Layer (only uses Entity)
//         ⇅
// Database

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employee);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto);
    
    // returning EmployeeDto instead of void to provide feedback
    EmployeeDto deleteEmployeeById(Long employeeId);
}
