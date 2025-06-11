package FullStack.mapper;

import FullStack.dto.EmployeeDto;
import FullStack.entity.EmployeeEntity;

//! A Mapper is a component used to convert one object type into another — typically from:
// Entity ⇄ DTO(API - data transfer
// DTO ⇄ Entity(database structre)

// as the two (dto, entitiy) are usually not the same, so we need to map (convert) between them.

public class EmployeeMapper {

    public static EmployeeDto maptoEmployeeDto(EmployeeEntity employee) {
        
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());

        return dto;
    } 

    public static EmployeeEntity maptoEmployee(EmployeeDto employeeDto) {

        EmployeeEntity employee = new EmployeeEntity();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        return employee;
    }
}
