import React, { useState } from 'react';
import styled from 'styled-components';
import { createPost } from '../services/postService';

const Form = styled.form`
  max-width: 760px;
  margin: 20px auto;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
`;
const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (body.trim() === '') {
      setBodyError('Body is required');
      isValid = false;
    } else {
      setBodyError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createPost({ title, body })
        .then((newPost) => {
          onPostCreated(newPost);
          setTitle('');
          setBody('');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Body</Label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></Textarea>
        {bodyError && <ErrorMessage>{bodyError}</ErrorMessage>}
      </FormGroup>
      <Button type="submit">Create Post</Button>
    </Form>
  );
};

export default CreatePost;
