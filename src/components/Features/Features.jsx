import React from 'react'
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import img6 from "../../assets/img6.png";
import { HiOutlineArrowRight } from "react-icons/hi";
const Features = () => {

    const featuresData = [
        {
            img: img3,
            imgClass: "",
            aosDelay: "0",
            title: "Search Data",
            description: "Don’t worry if your data is very large, the Data Warehouse provides a search engine, which is useful for making it easier to find data effectively saving time.",
            svgs: (
                <>
                    <svg className='relative MobiSvg-svg' width="380" height="310" viewBox="0 0 427 353" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M43.734 41.784C47.7712 17.6952 68.6214 0.048645 93.0462 0.048645H376.923C404.537 0.048645 426.923 22.4344 426.923 50.0486V302.608C426.923 330.222 404.537 352.608 376.923 352.608H50.7179C19.8026 352.608 -3.70442 324.833 1.40564 294.343L43.734 41.784Z" fill="#68C9BA" />
                    </svg>
                    <svg className='absolute Features-banner-svgTwo' width="191" height="137" viewBox="0 0 191 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M180.142 78.649C205.475 107.383 175.562 135.129 122.914 135.878C18.2425 128.98 -5.3775 36.2807 2.53307 15.4969C10.4436 -5.28703 33.9985 -5.85431 68.8988 36.4853C103.799 78.8248 148.475 42.731 180.142 78.649Z" stroke="white" strokeWidth="1.5" />
                    </svg>
                    <svg className='absolute Features-banner-svgThree' width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="17.3483" cy="12.2998" rx="16.592" ry="9.80438" transform="rotate(20.7184 17.3483 12.2998)" stroke="white" strokeWidth="1.5" />
                    </svg>
                </>
            )
        },
        {
            img: img4,
            imgClass: "img-height",
            aosDelay: "200",
            title: "24 Hours Access",
            description: "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
            svgs: (
                <>
                    <svg className='MobiSvg-svg' width="380" height="310" viewBox="0 0 427 353" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M43.8112 41.784C47.8484 17.6951 68.6985 0.048584 93.1234 0.048584H377C404.615 0.048584 427 22.4343 427 50.0486V302.608C427 330.222 404.615 352.608 377 352.608H50.7951C19.8797 352.608 -3.62727 324.833 1.48279 294.343L43.8112 41.784Z" fill="#9C69E2" />
                    </svg>
                    <svg className='absolute Features-bannerTuo' width="208" height="149" viewBox="0 0 208 149" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5379 63.4477C-16.0818 32.1204 16.5307 1.87086 73.9301 1.05483C188.047 8.5749 213.798 109.639 205.174 132.299C196.55 154.958 170.869 155.577 132.819 109.416C94.7697 63.256 46.0624 102.607 11.5379 63.4477Z" stroke="white" strokeWidth="1.5" />
                    </svg>
                </>
            )
        },
        {
            img: img5,
            imgClass: "",
            aosDelay: "400",
            title: "Print Out",
            description: "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
            svgs: (
                <>
                    <svg className='relative MobiSvg-svg' width="380" height="310" viewBox="0 0 427 354" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M43.733 42.5833C47.7703 18.4944 68.6204 0.8479 93.0453 0.8479H376.922C404.536 0.8479 426.922 23.2337 426.922 50.8479V303.407C426.922 331.021 404.536 353.407 376.922 353.407H50.7169C19.8016 353.407 -3.7054 325.633 1.40467 295.142L43.733 42.5833Z" fill="#F063B8" />
                    </svg>
                    <svg className='absolute Features-banner-five' width="64" height="51" viewBox="0 0 64 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="32.3929" cy="25.4173" rx="33.5103" ry="19.8015" transform="rotate(150 32.3929 25.4173)" stroke="white" strokeWidth="1.5" />
                    </svg>
                </>
            )
        },
        {
            img: img6,
            imgClass: "img-height",
            aosDelay: "600",
            title: "Security Code",
            description: "Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.",
            svgs: (
                <>
                    <svg className='relative MobiSvg-svg' width="380" height="310" viewBox="0 0 427 354" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M43.8102 42.5833C47.8474 18.4944 68.6976 0.8479 93.1224 0.8479H376.999C404.614 0.8479 426.999 23.2337 426.999 50.8479V303.407C426.999 331.021 404.614 353.407 376.999 353.407H50.7941C19.8788 353.407 -3.62825 325.633 1.48182 295.142L43.8102 42.5833Z" fill="#2D9CDB" />
                    </svg>
                    <svg className='absolute Features-banner-svgSix' width="295" height="226" viewBox="0 0 295 226" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.5101 222.794C-2.10404 234.815 -16.5061 171.666 24.2554 98.6882C116.823 -39.7434 263.019 1.36428 285.314 28.7376C307.61 56.111 289.693 88.9456 203.78 103.32C117.867 117.695 132.028 207.767 57.5101 222.794Z" stroke="white" strokeWidth="1.5" />
                    </svg>
                    <svg className='absolute Features-bannerSix' width="61" height="42" viewBox="0 0 61 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="30.2955" cy="21.2277" rx="30.4548" ry="17.996" transform="rotate(20.7184 30.2955 21.2277)" stroke="white" strokeWidth="1.5" />
                    </svg>
                </>
            )
        }
    ];


    return (
        <div className='Features'>
            <div className='Features-center'>
                <h1 data-aos="fade-up">Features</h1>
                <div className='Features-center-text' data-aos="fade-up">
                    Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.
                </div>
            </div>
            <div className='Features-text'>
                <div className='Features-text-prodata flex'>
                    {featuresData.map((feature, index) => (
                        <div data-aos="fade-up" data-aos-delay={feature.aosDelay} className='Features-colum-item relative' key={index}>
                            <div className='Features-item-banner absolute'>
                                {feature.svgs}
                            </div>
                            <div className='flex Features-itemData absolute'>
                                <div className='Features-itemData-img'>
                                    <img src={feature.img} alt={`feature-${index}`} className={feature.imgClass}
                                        data-aos="zoom-in"
                                        data-aos-delay="800"
                                    />
                                </div>
                                <div className='Features-itemData-text'>
                                    <div className='mt-16 ml-6 Text_MobiA'>
                                        <h3 data-aos="fade-up" data-aos-delay="1000">{feature.title}</h3>
                                        <div className='ItemData-textOne' data-aos="fade-up" data-aos-delay="1000" >{feature.description}</div>
                                        <button data-aos="fade-up" data-aos-delay="1000">Learn more <span><HiOutlineArrowRight /></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features