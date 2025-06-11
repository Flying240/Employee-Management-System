package FullStack.service.implementation;

import FullStack.dto.EmployeeDto;
import FullStack.entity.EmployeeEntity;
import FullStack.exception.ResourceNotFoundException;
import FullStack.exception.ResourceConflictException;
import FullStack.mapper.EmployeeMapper;
import FullStack.repository.EmployeeRepository;
import FullStack.service.EmployeeService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDTO) {
        EmployeeEntity emailExists = employeeRepository.findByEmail(employeeDTO.getEmail());
        if (emailExists != null) {
            throw new ResourceConflictException("Email already in use by employee with ID: " + emailExists.getId());
        }
        
        // Convert EmployeeDTO to Employee entity
        EmployeeEntity employee = EmployeeMapper.maptoEmployee(employeeDTO);
        
        // Save employee to database
        EmployeeEntity savedEmployee = employeeRepository.save(employee);
        
        // Convert saved Employee entity back to DTO and return
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        EmployeeEntity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));
        
                return EmployeeMapper.maptoEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeEntity> employees = employeeRepository.findAll();
       
        // Convert List<Employee> to List<EmployeeDto>
        return employees.stream()
                .map(EmployeeMapper::maptoEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {
        EmployeeEntity existingEmployee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        EmployeeEntity emailExists = employeeRepository.findByEmail(updatedEmployeeDto.getEmail());
        if (emailExists != null && !emailExists.getId().equals(employeeId)) {
            throw new ResourceConflictException("Email already in use by another employee with ID: " + emailExists.getId());
        }

        existingEmployee.setFirstName(updatedEmployeeDto.getFirstName());
        existingEmployee.setLastName(updatedEmployeeDto.getLastName());
        existingEmployee.setEmail(updatedEmployeeDto.getEmail());

        EmployeeEntity updatedEmployee = employeeRepository.save(existingEmployee);
        return EmployeeMapper.maptoEmployeeDto(updatedEmployee);
    }

    @Override
    public EmployeeDto deleteEmployeeById(Long employeeId) {
        EmployeeEntity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        employeeRepository.deleteById(employeeId);

        // Return the deleted employee as a DTO
        return EmployeeMapper.maptoEmployeeDto(employee);
    }
}
