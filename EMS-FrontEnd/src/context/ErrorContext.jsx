import React, { createContext, useState, useContext, useCallback } from "react";
import { ErrorTypes } from "../types/errors";

const ErrorContext = createContext();

// Provider that captures and displays global errors
export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    // Central error handler: call this from any component when an API call fails
    const handleError = useCallback((error) => {
        const resp = error.response?.data;
        const status = error.response?.status;
        let type, message;

        switch (status) {
            case 404:
                type = ErrorTypes.NOT_FOUND;
                message = resp?.message || "Resource not found";
                break;
            case 409:
                type = ErrorTypes.CONFLICT;
                message = resp?.message || "Conflict occurred";
                break;
            case 400:
                type = ErrorTypes.VALIDATION;
                message = typeof resp === "object"
                    ? Object.values(resp).join(", ")
                    : resp?.message || "Validation error";
                break;
            case 500:
                type = ErrorTypes.SERVER_ERROR;
                message = resp?.message || "Internal server error";
                break;
            default:
                type = ErrorTypes.NETWORK_ERROR;
                message = resp?.message || "Network error";
        }

        // Debug log (uncomment for development)
        // console.log("Error Details:", { status, type, message, rawResponse: resp });

        // Prepend new error to list
        setErrors((prev) => [{ type, message }, ...prev]);
    }, []);

    // Clear all errors
    const clearErrors = useCallback(() => setErrors([]), []);

    return (
        <ErrorContext.Provider value={{ errors, handleError, clearErrors }}>
            {/* Render alerts for each error */}
            {errors.map((err, idx) => (
                <div
                    key={idx}
                    className={`alert ${getAlertClass(
                        err.type
                    )} alert-dismissible fade show`}
                    role='alert'
                >
                    <span className='me-2'>{getErrorIcon(err.type)}</span>
                    {err.message}
                    <button
                        type='button'
                        className='btn-close'
                        onClick={() =>
                            setErrors((prev) =>
                                prev.filter((_, i) => i !== idx)
                            )
                        }
                    />
                </div>
            ))}
            {children}
        </ErrorContext.Provider>
    );
};

// Determine Bootstrap alert class based on error type
const getAlertClass = (type) => {
    switch (type) {
        case ErrorTypes.NOT_FOUND:      return "alert-warning";
        case ErrorTypes.CONFLICT:       return "alert-danger";
        case ErrorTypes.VALIDATION:     return "alert-info";
        case ErrorTypes.SERVER_ERROR:   return "alert-danger";
        default:                        return "alert-secondary";
    }
};

// Choose an icon for each error type
const getErrorIcon = (type) => {
    switch (type) {
        case ErrorTypes.NOT_FOUND:      return "⚠️";
        case ErrorTypes.CONFLICT:       return "❌";
        case ErrorTypes.VALIDATION:     return "ℹ️";
        case ErrorTypes.SERVER_ERROR:   return "🔥";
        default:                        return "⚡";
    }
};

// Custom hook to use the ErrorContext
export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) throw new Error("useError must be used within ErrorProvider");
    return context;
};
