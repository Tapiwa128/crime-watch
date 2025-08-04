import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo.png'; // Make sure your logo is in src/assets/logo.png

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.colors.light};
`;

const AuthBox = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: ${props => props.theme.radii.md};
  width: 100%;
  max-width: 450px;
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 145px;
  width: auto;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(124, 77, 255, 0.10);
`;

const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.dark};
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.accent};
    margin: 0.5rem auto;
    border-radius: 2px;
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.radii.sm};
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
  }
`;

const AuthButton = styled.button`
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.radii.sm};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const AuthFooter = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  a {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.danger};
  text-align: center;
  margin-bottom: -0.5rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Dummy credentials
    const validEmail = 'user@vicfalls.com';
    const validPassword = '123456';

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        setErrorMsg('');
        navigate('/dashboard');
      } else {
        setErrorMsg('Invalid email or password!');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthContainer>
      <AuthBox>
        <LogoImg src={logo} alt="CrimeAlert Logo" />
        <AuthTitle>Login</AuthTitle>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        
        <AuthForm onSubmit={handleLogin}>
          <InputGroup>
            <FaEnvelope />
            <AuthInput
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaLock />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <AuthButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </AuthButton>
        </AuthForm>

        <AuthFooter>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </AuthFooter>
      </AuthBox>
    </AuthContainer>
  );
};

export default Login;