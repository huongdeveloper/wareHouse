import React, { useEffect, useRef, useState } from 'react'
import ModalLogin from './ModalLogin'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        closeModal();
    };

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

        if (accessToken) {
            localStorage.removeItem('accessToken');
            sessionStorage.removeItem('accessToken');


            setIsLoggedIn(false);
            toast.success('Logged out successfully!');
        } else {
            toast.info('No active session to log out from.');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className='container Navbar-header h-20 fixed'>
            <div data-aos="fade-down" data-aos-delay="400" className='pt-4 flex items-center relative'>
                <Link to="/warehouse" className=''>
                    <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        width="49" height="36" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="15.8323" width="19.8758" height="19.8758" rx="9.93789" fill="#9C69E2" />
                        <rect x="28.8203" y="0.925446" width="19.8758" height="34.7826" rx="9.93789" fill="#F063B8" />
                    </motion.svg>
                </Link>

                <div className='right-3 absolute Navbar-right'>
                    {!isLoggedIn ? (
                        <button className='Navbar-Sign Navbar-rightA'
                            data-aos="zoom-in"
                            data-aos-once="true"
                            onClick={openModal}
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className='flex Navbar-right-flex'>
                            <Link to="/Profile" className='Navbar-Profile mr-5 Navbar-rightA'
                                data-aos="fade-down" data-aos-delay="200"
                            >
                                <p>Profile</p>
                            </Link>
                            <button className='Navbar-Logout Navbar-rightA' onClick={handleLogout}
                                data-aos="fade-down" data-aos-delay="600"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    <div className='Bar_Amo' onClick={toggleMenu}><FaBars /></div>
                    {isMenuOpen && (
                        <div className='Mobile-Menu' data-aos="fade-down" ref={menuRef}>
                            {!isLoggedIn ? (
                                <button className='Navbar-Sign'
                                    data-aos="fade-down" data-aos-delay="400"
                                    onClick={() => {
                                        toggleMenu();
                                        openModal();
                                    }}
                                >
                                    Sign In
                                </button>
                            ) : (
                                <div className='flex flex-col mobiB'>
                                    <Link to="/Profile" className='Navbar-Profile'
                                        data-aos="fade-down" data-aos-delay="200"
                                        onClick={toggleMenu}
                                    >
                                        <p>Profile</p>
                                    </Link>
                                    <button className='Navbar-Logout'
                                        data-aos="fade-down" data-aos-delay="800"
                                        onClick={() => {
                                            handleLogout();
                                            toggleMenu();
                                        }}>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ModalLogin
                show={isModalOpen}
                handleClose={closeModal}
                onLogin={handleLoginSuccess}
            />
            <ToastContainer />
        </div>
    )
}

export default Navbar