import React from 'react';
const DisplayRating = ({ ratingValue }) => {
    
    const totalStars = 5;
    const stars = Array(totalStars).fill(null); 

    return (
        <div className="star-display">
            {stars.map((_, index) => {
                const starNumber = index + 1; 
                const isFilled = starNumber <= ratingValue;

                return (
                    <i
                        key={index}
                        // Lớp icon của Font Awesome, sử dụng 'text-warning' của Bootstrap cho màu vàng
                        className={`fa ${isFilled ? 'fa-star' : 'fa-star-o'} text-warning`} 
                    ></i>
                );
            })}
        </div>
    );
};

export default DisplayRating;