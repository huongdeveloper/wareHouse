import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../../Services/ApiServices';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalLogin = ({ show, handleClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        if (username.trim() === '') {
            setError('You entered the wrong name, please enter again!');
            return;
        }

        try {
            const response = await loginUser({ username });

            if (response && response.accessToken) {
                setError('');
                onLogin();
                setUsername('');
                toast.success('loginUser success.');
                handleClose();

            } else {
                setUsername('');
                setError('Login failed. Please try again.');
            }
        } catch (error) {

            console.error('Error during login:', error);
            setError('');
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <svg
                        data-aos="zoom-in"
                        data-aos-once="true"
                        width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="15.8323" width="19.8758" height="19.8758" rx="9.93789" fill="#9C69E2" />
                        <rect x="28.8203" y="0.925446" width="19.8758" height="34.7826" rx="9.93789" fill="#F063B8" />
                    </svg>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='Modal-body-text'>
                    <h1
                        data-aos="zoom-in"
                        data-aos-once="true"
                    >
                        Sign In
                    </h1>
                    <div className='Modal-body-textOne'>
                        <label
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                        >
                            Username
                        </label>
                        <div className='Modal-textOne-name'
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="200"
                        >
                            <input type="text"
                                value={username}
                                onKeyPress={handleKeyPress}
                                onChange={handleUsernameChange}
                                placeholder="Enter your username" />
                        </div>
                        {error && <p className="error-text">{error}</p>}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='ModalFooter-login' onClick={handleLogin}
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                >
                    Sign In
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogin