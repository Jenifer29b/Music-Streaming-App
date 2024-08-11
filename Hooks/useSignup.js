import { useState } from "react";
import { useAuth } from "../contexts/Authcontext.jsx";
import { message } from "antd";

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    

    
    const registerUser = async (values) => {
    if (values.password !== values.conformpassword) {
        setError("Passwords do not match");
        return;
    }

    setLoading(true);
    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( values )
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful response
            if (response.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else {
                message.error("Unexpected response status");
            }
        } else {
            // Handle error response
            if (response.status === 400 || response.status === 409) { // Assuming 409 for User Already Exists
                setError(data.message);
                message.error(data.message); // Show server-side error message
            } else {
                setError("Registration Failed");
                message.error("Registration Failed");
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setError("An unexpected error occurred");
        message.error("An unexpected error occurred");
    } finally {
        setLoading(false);
    }
};

    return { loading, error, registerUser };
};

export default useSignup;
