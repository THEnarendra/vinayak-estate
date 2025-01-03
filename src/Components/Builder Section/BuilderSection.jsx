import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import './BuilderSection.css';
import PropertyPopup from '../Popup/PropertyPopup';
import { useNavigate } from 'react-router-dom';
import buildersData from '../../staticData/data';

const CarouselContainer = styled.div`
  width: 97%;
  margin: auto;
  padding: 40px 20px; /* Increased padding for better spacing */
`;

const BuilderSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const navigate = useNavigate();

  const openPopup = (builder) => {
    setSelectedBuilder(builder);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBuilder(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <>
      <CarouselContainer>
        <Slider {...settings} >
          {buildersData.map((builder) => (
            <div className="carousel-item" 
            onClick={()=>navigate("/propertydetails")}
            key={builder.id}>
              <div className="gradient-container">
                <div className="content">
                  <h3 className="builder-name">{builder.builderName}</h3>
                  <p className="property-type">{builder.type}</p>
                  <p className="property-location">{builder.location}</p>
                  <strong className="property-price">{builder.price}</strong>
                  <button
                    className="contact-btn"
                    onClick={() => openPopup(builder)}
                  >
                    Contact
                  </button>
                </div>
                <div className="image-container">
                  <img
                    src={builder.image}
                    alt={builder.builderName}
                    className="property-image"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </CarouselContainer>

      {isPopupOpen && selectedBuilder && (
        <PropertyPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          image={selectedBuilder.image}
          name={selectedBuilder.builderName}
          price={selectedBuilder.price}
        />
      )}
    </>
  );
};

export default BuilderSection;
