import axios from "axios";

/**
 * Base URL for all API calls to the employee service
 * Format: http://localhost:PORT/api/employees
 */
const REST_API_BASE_URL = "http://localhost:8080/api/employees";

/**
 * Global error handler for all API calls
 * This will run whenever there's an error in any API call
 */
axios.interceptors.response.use(
    // If API call is successful, just return the response
    response => response,
    // If API call fails, handle the error
    error => {
        // Log error details to console for debugging
        console.error('❌ API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        return Promise.reject(error);
    }
);

const getAllEmployees = async () => {
    try {
        const response = await axios.get(REST_API_BASE_URL);
        return response;
    } catch (error) {
        throw error; // Error will be handled by the component
    }
};

const createEmployee = async (employee) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, employee);
        return response;
    } catch (error) {
        // Special handling for validation errors
        if (error.response?.status === 400) {
            const validationErrors = error.response.data;
            error.message = `Please check your input: ${Object.values(validationErrors).join(', ')}`;
        }
        throw error;
    }
};

const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateEmployee = async (employeeId, employee) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);
        return response.data;
    } catch (error) {
        // Special handling for duplicate email error
        if (error.response?.status === 409) {
            error.message = "This email is already being used by another employee";
        }
        throw error;
    }
};

const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Export all functions so they can be used in other files
export {
    getAllEmployees, 
    createEmployee,  
    getEmployeeById, 
    updateEmployee,     
    deleteEmployee      
};