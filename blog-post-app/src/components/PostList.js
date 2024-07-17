import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { fetchPosts } from '../services/postService';
import Spinner from './Spinner';

const Container = styled.div`
  max-width: 840px;
  margin: 20px auto;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 97%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 25px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #2980b9, #27ae60);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: linear-gradient(135deg, #bdc3c7, #ecf0f1);
  }
`;

const PageInfo = styled.span`
  margin: 0 10px;
`;

const PostList = ({ posts, onDelete }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);


  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {currentPosts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
      <PaginationNav>
        <PaginationButton onClick={goToFirstPage} disabled={currentPage === 1}>
          First
        </PaginationButton>
        <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </PaginationButton>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </PaginationButton>
        <PaginationButton onClick={goToLastPage} disabled={currentPage === totalPages}>
          Last
        </PaginationButton>
      </PaginationNav>
    </Container>
  );
};

export default PostList;
