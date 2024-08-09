import React from "react";


const HeroSection = () => {
  return (
    <section className="heroSection" id="heroSection">
      
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
            <h1 className="display-4">Welcome to Delicious Eats</h1>
            <p className="lead">Experience exquisite flavors in every bite. Our restaurant offers a blend of culinary artistry and delightful ambiance.</p>
            <a href="Menu" className="Menu">Explore Our Menu</a>
        </div>
    </div>
    </section>
  );
};

export default HeroSection;