import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useError } from "../context/ErrorContext";

const EditEmployee = () => {
    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    
    // Single loading state for update operation
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const { handleError, clearErrors } = useError();

    // Load employee data
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getEmployeeById(id);
                const emp = response.data;
                setFirstName(emp.firstName);
                setLastName(emp.lastName);
                setEmail(emp.email);
            } catch (err) {
                handleError(err);
                navigate("/employees");
            }
        };

        fetchEmployee();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        try {
            setIsSubmitting(true);
            await updateEmployee(id, { firstName, lastName, email });
            navigate("/employees");
        } catch (err) {
            handleError(err);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Edit Employee</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label>First Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={firstName}
                            placeholder='Enter First Name'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            value={lastName}
                            placeholder='Enter Last Name'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            value={email}
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Employee'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
