import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import ListAllEmployeeComponent from "./components/ListAllEmployee";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className='min-vh-100 bg-light'>
            {/* App Header */}
            <header className='bg-black text-white py-3 shadow-sm'>
                <h1 className='text-center fs-3 m-0'>
                    Employee Management System
                </h1>
            </header>

            {/* Main Routing Section */}
            <main className='container py-4'>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/employees' />}
                        />
                        <Route
                            path='/employees'
                            element={<ListAllEmployeeComponent />}
                        />
                        <Route
                            path='/AddEmployee'
                            element={<AddEmployee />}
                        />
                        <Route
                            path='/EditEmployee/:id'
                            element={<EditEmployee />}
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
