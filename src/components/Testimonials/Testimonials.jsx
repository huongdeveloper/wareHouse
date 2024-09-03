import React, { useRef } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import name1 from "../../assets/name1.jfif";
import name2 from "../../assets/name2.jpg";
import name3 from "../../assets/name3.jpg";
const Testimonials = () => {
    const sliderRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    const testimonials = [
        {
            imgSrc: name1,
            name: "John Fang",
            website: "wordfaang.com",
            description: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla."
        },
        {
            imgSrc: name2,
            name: "Taylor Swift",
            website: "nld.com.vn",
            description: "Taylor Swift with the album Reputation and rapper Drake with the album Scorpion are closely chasing each other for the top spot on the Billboard top 5 albums with the highest sales in the US in 2018, up to this point."
        },
        {
            imgSrc: name3,
            name: "Best Children's Music Songs",
            website: "zingmp3.vn",
            description: "The current Top 100 hottest Youth Music of the Youth Music genre, automatically compiled by Zing MP3 based on the listening and sharing data of each song on the web version and Mobile version."
        }
    ];
    return (
        <div className='Testimonials' data-aos="zoom-in" data-aos-delay="400">
            <div className='Testimonials-text'>
                <h1 data-aos="fade-right" data-aos-delay="1000">Testimonials</h1>
                <div className='Testimonials-Slider' data-aos="zoom-in" data-aos-delay="1000">
                    <Slider ref={sliderRef} {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <div className='grid__colum' key={index}>
                                <div className='Slider-Test'>
                                    <div className='Slider-Test flex'>
                                        <div className='Slider-img'>
                                            <img src={testimonial.imgSrc} alt="Logo" className="" />
                                        </div>
                                        <div className='Slider-texts'>
                                            <h2>{testimonial.name}</h2>
                                            <p>{testimonial.website}</p>
                                            <div className='Slider-texts-des'>{testimonial.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Testimonials