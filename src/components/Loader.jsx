// Updated Loader.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/logo.png'; 

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background:rgba(23, 237, 237, 1);
  color: black;
  animation: ${fadeIn} 0.5s ease;
`;

const LoaderContent = styled.div`
  text-align: center;
`;

const LogoContainer = styled.div`
  position: relative;
  margin: 0 auto 1.5rem;
  width: 150px; /* Adjust based on your logo aspect ratio */
  height: 150px; /* Adjust based on your logo aspect ratio */
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Spinner = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: white;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

const LogoText = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 1rem;
`;

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoaderContainer>
      <LoaderContent>
        <LogoContainer>
          <LogoImage src={logo} alt="Vic Falls Crime Alert Logo" />
          <Spinner />
        </LogoContainer>
        <LogoText>Vic Falls Crime Alert</LogoText>
        <Subtitle>Keeping our community safe</Subtitle>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default Loader;