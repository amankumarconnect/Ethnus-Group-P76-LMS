import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth.js';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [status, setStatus] = useState('Verifying payment...');
    const [error, setError] = useState('');

     useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            const processPayment = async () => {
                try {
                    // Step 1: Tell our backend to verify the session with Stripe
                    await api.post('/api/payments/verify-session', { sessionId });
                    setStatus('Payment confirmed! Updating your profile...');

                    // Step 2: Fetch the complete, updated user profile from our backend
                    const { data: updatedUserInfo } = await api.get('/api/users/profile');
                    
                    // Step 3: Update the entire app's context and localStorage with this fresh data
                    login(updatedUserInfo);

                    setStatus('Enrollment complete! Redirecting...');
                    
                    // Step 4: Navigate to the courses page
                    setTimeout(() => {
                        navigate('/my-courses');
                    }, 1500);

                } catch (err) {
                    const message = err.response?.data?.message || 'An error occurred during verification.';
                    setError(message + ' Please contact support.');
                    setStatus('');
                }
            };
            processPayment();
        } else {
            setError('Could not find session ID. Navigation failed.');
            setStatus('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, navigate]); // login is stable, no need to add

    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1>Payment Status</h1>
            {status && <p className="loading-spinner">{status}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PaymentSuccessPage;