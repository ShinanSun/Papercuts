import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import BookDetail from '../global/BookDetail.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const BookCarousel = ({books, setModalBook, setShow}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, 
    },
  };
  return (
    <div>
      <Carousel
        swipeable
        draggable={false}
        showDots={false}
        responsive={responsive}
        arrows={true}
        infinite={false}
        keyBoardControl
        customTransition='all .5'
        transitionDuration={500}
        containerClass='carousel-container'
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-10-px'
      >
        {books.map((book) => {
          return (
            <div key={book.primary_isbn10}>
              <Image
                style={{ width: 'auto', height: '280px' }} src={book.book_image}
                onClick={() => {
                  setModalBook(book)
                  setShow(true)
                }       
                }/>
            </div>
          );
        })}
      </Carousel>
      
    </div>
  );
};
export default BookCarousel;
