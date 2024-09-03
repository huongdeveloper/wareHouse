import React from 'react'
import data1 from "../../assets/Data1.png";
const Hero = () => {
    return (
        <div className='Hero-headline flex relative'>
            <div className='Hero-headline-text'>
                <h1
                    data-aos="zoom-out"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    Save your data storage here.
                </h1>
                <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="1000"
                    className='Hero-text'>Data Warehouse is a data storage area that has been
                    tested for security, so you can store your data here
                    safely but not be afraid of being stolen by others.
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="600"
                    className='Learn-moreA-mobiA'
                >
                    <button className='Learn-more duration-200 hover:scale-105 bg-gradient-to-r'>Learn more</button>
                </div>

            </div>
            <div className='absolute Hero-headline-one'
                data-aos="zoom-in"
                data-aos-once="true"
                data-aos-delay="1400"
            >
                <img src={data1} alt="data1" className="Hero-headline-img" />
            </div>
        </div>
    )
}

export default Hero