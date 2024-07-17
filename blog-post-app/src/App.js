import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import { fetchPosts } from './services/postService';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 60px; /* Adjust based on the footer height */
`;

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Router>
      <AppContainer>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={
              <>
                <CreatePost onPostCreated={handlePostCreated} />
                <PostList posts={posts} onDelete={handlePostDeleted} />
              </>
            } />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
