import React from 'react'
import { useAuth } from '../../../contexts/AuthContext';

export default () => {
    const {
        isAuthenticated,
        loginUser,
        logoutUser,
        Token,
        isLoginNotify, setIsLoginNotify,
        token,
        userDeatils,

        // loading,
        // setLoading,
    } = useAuth();

    const newNotrify = () => {
        setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
    }
    const scrollimages = [
        {
            src: "https://i.ibb.co.com/DChN5S5/img-1.jpg",
            alt: "Image 1",
            link: "#",
        },
        {
            src: "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
            alt: "Image 2",
            link: "#",
        },
        {
            src: "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
            alt: "Image 3",
            link: "#",
        },
        // Add more images as needed
    ];
    return (
        <div className="recommend scroll-banner">
            <div className="recommend-title">
                <h2>Favourites</h2>
            </div>
            <div className="recommend-bg">
                <div className="recommend-main">
                    {scrollimages.map((image) => (
                        <div key={image.id} className="recommend-card" >
                            <a href="#">
                                <img alt={image.id} src={image.src} loading="lazy" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
