import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../context/context.jsx';
import { Container } from 'react-bootstrap';

import ClubBanner from './ClubBanner.jsx';
import ClubsCarousel from './ClubsCarousel.jsx';
import SearchBookClubs from './SearchBookClubs.jsx';
import Error from '../global/Error.jsx';

const BookClubs = () => {
  const { club, error, keyword, updateKeyword } = useContext(AppContext);
  const [found, setFound] = useState(false);

  useEffect(() => {
    updateKeyword('');
  }, []);

  return (
    <div className='p-0 m-0 mt-3'>
      <Container>
        <SearchBookClubs setFound={setFound} />
      </Container>
      {error ? (
        <Error />
      ) : found ? (
        <Redirect to={`/clubs/detail/${club._id}`} />
      ) : (
        <Fragment>
          {!keyword && (
            <Container className='py-1 my-1' style={{ maxWidth: '90vw' }}>
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
