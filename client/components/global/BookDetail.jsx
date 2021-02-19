import React, { useState, useEffect } from 'react';
import {
  Modal,
  Image,
  Button,
  Table,
  Badge,
  Spinner,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';

//Props: id from Google books (number), show & owned & inLibrary (boolean), handleClose & handleAddToLibrary & handlePurchase functions
export default function BookDetail({
  // id,
  inLibrary,
  owned,
  handlePurchase,
  handleAddToLibrary,
  handleClose,
  show,
  book
}) {
  // const [data, setData] = useState({});

  //Temporary test constants
  // id = '0efCDwAAQBAJ';
  // owned = false;
  // inLibrary = true;
  // handlePurchase = () => {};
  // handleAddToLibrary = () => {};

  //Temporary fetch from Google Books, will need to replaced by our own server proxy route
  // useEffect(async () => {
  //   let info = await axios.get(
  //     `https://www.googleapis.com/books/v1/volumes/${id}?key=${'AIzaSyClsYn7svvE9FTXQi_2hEVc9A0_vZgYCOY'}`
  //   );
  //   setData(info.data);
  // }, []);

  return book === undefined ? (
    <Spinner animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Modal
      size='lg'
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Image src={book.image} fluid rounded />
          </Col>
          <Col>
            <div>by {book.authors.join(', ')}</div>
            <p>{book.price}</p>
            <br />
            <br />
            <p>{book.description}</p>
            {/* <Table size='sm' striped bordered variant='light'>
              <tbody>
                <tr>
                  <td>Publisher</td>
                  <td colSpan='2'>{data.volumeInfo.publisher}</td>
                </tr>
                <tr>
                  <td>Published Date</td>
                  <td colSpan='2'>{data.volumeInfo.publishedDate}</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td colSpan='2'>{data.volumeInfo.language}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td colSpan='2'>{`$${data.saleInfo.retailPrice.amount}`}</td>
                </tr>
                <tr>
                  <td>Tags</td>
                  <td colSpan='2'>
                    {data.volumeInfo.categories.map((category, idx) => (
                      <React.Fragment key={idx}>
                        <Badge pill variant='light'>
                          {category}
                        </Badge>{' '}
                      </React.Fragment>
                    ))}
                  </td>
                </tr>
              </tbody>
            </Table> */}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={handleAddToLibrary}
          disabled={inLibrary}
        >
          {'Add to Library'}
        </Button>
        <Button variant='primary' onClick={handlePurchase} disabled={owned}>
          {'Purchase'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
