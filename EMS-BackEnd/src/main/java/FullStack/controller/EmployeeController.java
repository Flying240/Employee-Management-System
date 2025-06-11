package FullStack.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import FullStack.dto.EmployeeDto;
import FullStack.service.EmployeeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*") // allow frontend dev server
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //!Build POST add employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        // @Valid is used to validate the EmployeeDto object based on the constraints defined in the EmployeeDto class.
        // If the validation fails, a MethodArgumentNotValidException will be thrown, which is handled by the GlobalExceptionHandler.
        
        // @RequestBody is used to bind the HTTP request body to the EmployeeDto parameter.
        // This allows us to receive the employee data in the request body as JSON and convert it automatically to an EmployeeDto object.
        
        // The employeeService.createEmployee(employeeDto) method is called to save the employee data.
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //!Build GET employee REST API
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
      
        return ResponseEntity.ok(employeeDto);
    }

    //Build GET all employees REST API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        
        return ResponseEntity.ok(employees);
    }

    //!Build PUT update employee REST API
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, 
                                                      @Valid @RequestBody EmployeeDto updatedEmployeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, updatedEmployeeDto);
        
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedEmployee);
    }

    //Build DELETE employee REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeDto> deleteEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto deletedEmployee = employeeService.deleteEmployeeById(employeeId);
       
        return ResponseEntity.ok(deletedEmployee);
    }
}