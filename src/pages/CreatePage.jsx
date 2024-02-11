import React from 'react';
import UseForms from '../components/UseForms';
import useRequest from '../hooks/useRequest';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const { sendRequest, loading } = useRequest('/api/v1/users', 'POST');
    const navigate = useNavigate();

    const onSubmit = (name, isCompleted) => {
        sendRequest({ name, isCompleted }) // pass object directly, no need for array
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    if (loading) return <p>Loading . . . </p>;
    
    return <UseForms onFormSubmit={onSubmit} />;
};

export default CreatePage;
