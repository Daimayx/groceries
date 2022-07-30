import React from 'react';


export default function About() {

    return (
        <div>
            <div className="about_section layout_padding">
                <div className="l-container vh70 ">
                    <div className="row h100">
                        <div className="col-70 p-5">
                            <h1 className="about-title">About Us</h1>
                            <p className="justified">We offer a wide variety of daily groceries, you can order them from your house, and we will deliver to your doorsteps.</p>
                            <div className="center h100">
                                <a href="/destinations" className="btn-fancy"><span>Check destinations</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
