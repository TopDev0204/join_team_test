import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../services/postService';

const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const Excerpt = styled.p`
  margin: 0 0 10px;
`;

const ReadMoreLink = styled(Link)`
  color: #3498db;
  margin: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Post = ({ post, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
          deletePost(post.id)
            .then(() => {
              onDelete(post.id);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      };

  return (
    <PostContainer>
      <Title>{post.title}</Title>
      <Excerpt>{post.body.substring(0, 100)}...</Excerpt>
      <ReadMoreLink to={`/posts/${post.id}`}>Read More</ReadMoreLink>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </PostContainer>
  );
};

export default Post;
