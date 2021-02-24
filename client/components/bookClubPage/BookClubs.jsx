import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../context/context.jsx';
import { Container } from 'react-bootstrap';

import ClubBanner from './ClubBanner.jsx';
import ClubsCarousel from './ClubsCarousel.jsx';
import SearchBookClubs from './SearchBookClubs.jsx';
import Error from '../global/Error.jsx';

const BookClubs = () => {
  const { club, found, error, keyword } = useContext(AppContext);

  return (
    <div className='p-0 m-0'>
      <Container className='d-flex justify-content-left px-4 mx-4' style={{ maxWidth: '90vw' }}>
        <SearchBookClubs />
      </Container>
      {error ? (
        <Error />
      ) : found ? (
        <Redirect to={`/clubs/detail/${club._id}`} />
      ) : (
        <Fragment>
          {!keyword && (
            <Container
              className='d-flex justify-content-between pt-1 mt-1 px-4 mx-4'
              style={{ maxWidth: '90vw' }}
            >
              <ClubBanner main />
            </Container>
          )}
          <Container className='py-1 my-1' style={{ maxWidth: '90vw' }}>
            <ClubsCarousel />
          </Container>
        </Fragment>
      )}
    </div>
  );
};

export default BookClubs;
