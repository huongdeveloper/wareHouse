import React from 'react';
import Hero from './Hero/Hero';
import Features from './Features/Features';
import Testimonials from './Testimonials/Testimonials';
import Footer from './Footer/Footer';
const HomePage = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Testimonials />
            <Footer />
        </div>
    )
}

export default HomePage