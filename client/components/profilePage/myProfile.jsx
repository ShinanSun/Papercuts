import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import FriendRecommendations from './friendRecommendations.jsx';
import UserBookClubs from './userBookClubs.jsx';
import AllUsersModal from './allUsersModal.jsx';
import AllFriendsModal from './allFriendsModal.jsx';
import { Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../context/authContext.jsx';

export default function myFriends() {
  const user = useContext(AuthContext);
  const [allUsersShow, setAllUsersShow] = useState(false);
  const [allFriendsShow, setAllFriendsShow] = useState(false);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (user) {
      axios.post('/user/friends', { userId: user._id }).then((friends) => {
        setFriendsList(friends.data);
      });
    }
  }, [user]);

  return !user ? (
    <p></p>
  ) : (
    <div id='myProfile'>
      <div id='userHeader'>
        <h4>{user.username}</h4>
        {user.subscriptionTier && (
          <div className='btn btn-outline-secondary'>{user.subscriptionTier}</div>
        )}
      </div>
      <br />
      <br />
      <Row>
        <Col xs={5}>
          <h4>Friends</h4>
        </Col>
        <Col>
          <a
            variant='primary'
            onClick={() => {
              setAllUsersShow(true);
            }}
          >
            Find Friends
          </a>{' '}
          &gt;
        </Col>
        <Col>
          <a
            variant='primary'
            onClick={() => {
              setAllFriendsShow(true);
            }}
          >
            View All Friends
          </a>{' '}
          &gt;
        </Col>
      </Row>
      <div id='myFriends'>
        {friendsList.length > 0 &&
          friendsList.map((friend) => {
            return (
              <div className='friendsDiv' key={friend.username}>
                <div className='friendsBody'>
                  <img className='friendsImage' src={friend.photoUrl}></img>
                </div>
                <div>{friend.username}</div>
              </div>
            );
          })}
      </div>
      <br /> <br />
      <FriendRecommendations friendsList={friendsList} />
      <br /> <br />
      <UserBookClubs user={user} />
      {/* Modals */}
      <AllUsersModal
        handleClose={() => {
          setAllUsersShow(false);
        }}
        show={allUsersShow}
        user={user}
      />
      <AllFriendsModal
        handleClose={() => {
          setAllFriendsShow(false);
        }}
        show={allFriendsShow}
        friendsList={friendsList}
      />
    </div>
  );
}
