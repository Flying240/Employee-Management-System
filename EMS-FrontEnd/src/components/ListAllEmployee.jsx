import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees, deleteEmployee } from "../services/EmployeeService";
import { useError } from "../context/ErrorContext";

const ListAllEmployee = () => {
    // State for managing employees data and loading state
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Hooks for navigation and error handling
    const navigate = useNavigate();
    const { handleError, clearErrors } = useError();

    // Function to load employees - can be reused
    const loadEmployees = async () => {
        try {
            setIsLoading(true);
            clearErrors();

            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Load employees when component mounts
    useEffect(() => {
        loadEmployees();
    }, []);

    // Handle employee deletion
    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteEmployee(id);
                
                // Reload the full list after deletion
                await loadEmployees();
            } catch (err) {
                handleError(err);
            }
        }
    };

    return (
        <div className='container mt-4'>
            {/* Header Section */}
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2>Employees List</h2>
                <button
                    className='btn btn-primary'
                    onClick={() => navigate("/AddEmployee")}
                >
                    Add New Employee
                </button>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className='text-center'>
                    <div
                        className='spinner-border'
                        role='status'
                    >
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                /* Employees Table */
                <div className='table-responsive'>
                    <table className='table table-hover table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <button
                                            className='btn btn-info btn-sm me-2'
                                            onClick={() =>
                                                navigate(
                                                    `/EditEmployee/${emp.id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm'
                                            onClick={() =>
                                                handleDelete(
                                                    emp.id,
                                                    emp.firstName
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {!isLoading && employees.length === 0 && (
                        <div className='text-center mt-4'>
                            <p>No employees found. Add some!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListAllEmployee;
