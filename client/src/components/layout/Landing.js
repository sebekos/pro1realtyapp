import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Pro 1 Realty</h1>
                    <p className="lead">List your home or find a new one today</p>
                    <div className="buttons">
                        <Link to="/agents" className="btn btn-primary">
                            Find An Agent
                        </Link>
                        <Link to="/listings" className="btn btn-light">
                            Our Listings
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
