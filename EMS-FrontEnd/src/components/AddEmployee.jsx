import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/EmployeeService";
import { useError } from "../context/ErrorContext";

// Main component for adding a new employee
const AddEmployee = () => {
    // State to store form input values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    
    // Track if form is being submitted
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Hook for page navigation
    const navigate = useNavigate();
    // Hook for showing error messages
    const { handleError, clearErrors } = useError();

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevent default form submission
        e.preventDefault();
        // Clear any previous errors
        clearErrors();

        try {
            // Show loading state
            setIsSubmitting(true);
            
            // Send data to backend
            await createEmployee({ firstName, lastName, email });
            
            // Navigate back to employees list
            navigate("/employees");
            
        } catch (err) {
            // Show error message if something goes wrong
            handleError(err);
        } finally {
            // Reset loading state
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            {/* Page title */}
            <h2 className="text-center mb-4">Add New Employee</h2>
            
            {/* Employee form */}
            <form onSubmit={handleSubmit} className="shadow p-4 rounded mx-auto" style={{ maxWidth: "500px" }}>
                {/* First Name input */}
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        required
                    />
                </div>

                {/* Last Name input */}
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        required
                    />
                </div>

                {/* Email input */}
                <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Submit button with loading state */}
                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Employee...' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;