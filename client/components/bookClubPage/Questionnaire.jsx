import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { LoginModal } from '../global/loginRegisterModal.jsx';
import { AuthContext } from '../../context/authContext.jsx';
import { AppContext } from '../../context/context.jsx';

const questionnaire = [
  'From 1 (Worst) to 10 (Best), how would you rate your experience in our club?',
  'Would you be willing to recommend our book club to friends and family?',
  'What is your favorite book club event you have attended so far?',
  'What was your favorite part of the book?',
  'If you could ask the author one thing, what would it be?',
  "Anything else you'd like to let us know about your experience in our book club"
];

export default function Questionnaire({}) {
  const user = useContext(AuthContext);
  const { club } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmitQuestionnaire = (e) => {
    axios.post(`/bookclub/questionnaire/${club._id}`, formData).then(() => setShowAlert(true));
  };

  return (
    <>
      {showAlert && (
        <Alert variant='success'>
          Successfully submitted questionnaire. Thanks for your feedback!
        </Alert>
      )}
      <Form className='mt-2' autoComplete='off'>
        {questionnaire.map((question, idx) => (
          <Form.Group key={idx + 1} controlId={`question-${idx + 1}`}>
            <Form.Label>{question}</Form.Label>
            <Form.Control
              required
              type='text'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [`answer_${idx + 1}`]: e.target.value
                })
              }
            />
          </Form.Group>
        ))}
        {user ? (
          <Button variant='primary' onClick={handleSubmitQuestionnaire}>
            Submit
          </Button>
        ) : (
          <Alert variant='info'>
            <Alert.Heading>Please log in to answer the questionnaire</Alert.Heading>
            <LoginModal />
          </Alert>
        )}
      </Form>
    </>
  );
}
