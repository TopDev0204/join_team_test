import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
  position: relative; /* Changed from fixed to relative */
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Blog Post Application. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
