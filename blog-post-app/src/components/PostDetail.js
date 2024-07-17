import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../services/postService';
import Spinner from './Spinner';
const PostDetailContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin: 0 0 20px;
`;

const Body = styled.p`
  line-height: 1.6;
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <PostDetailContainer>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>
    </PostDetailContainer>
  );
};

export default PostDetail;
