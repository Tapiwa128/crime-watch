import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaShieldAlt,
  FaUserAlt,
  FaPaw,
  FaSearch,
  FaExclamationTriangle,
  FaCarCrash
} from 'react-icons/fa';

import {
    SiAnimalplanet,
} from 'react-icons/si';

import {
    GiPlantsAndAnimals,
} from 'react-icons/gi';

import { 
    MdOutlineNoiseControlOff 
} from "react-icons/md";

import { 
    MdHealthAndSafety 
} from "react-icons/md";

// Add your logo image here (place logo.png in public or src/assets)
import logo from '../assets/logo.png';

const DashboardWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255));
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LogoImg = styled.img`
  height: 140px;
  width: auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(124, 77, 255, 0.12);
`;

const Title = styled.h1`
  text-align: center;
  color: #222;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #555;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 1rem;
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const Tile = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    border-color:rgb(11, 81, 85);
  }
`;

const TileIcon = styled.div`
  font-size: 2.5rem;
  color:rgb(26, 140, 144);
  margin-bottom: 1rem;
`;

const TileTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const incidentTypes = [
  { type: 'Report Robbery', icon: <FaShieldAlt /> },
  { type: 'Break-In', icon: <FaUserAlt /> },
  { type: 'Stolen Gadget', icon: <FaSearch /> },
  { type: 'Missing Person', icon: <FaUserAlt /> },
  { type: 'Suspicious Activity', icon: <FaExclamationTriangle /> },
  { type: 'Missing Pet', icon: <FaPaw /> },
  { type: 'Problem Animal', icon: <SiAnimalplanet/> },
  { type: 'Traffic Incident', icon: <FaCarCrash /> },
  { type: 'Public Safety Concern', icon: <MdHealthAndSafety  /> },
  { type: 'Environmental Issue', icon: <GiPlantsAndAnimals /> },
  { type: 'Noise Complaint', icon: <MdOutlineNoiseControlOff/> },
  { type: 'Other', icon: <FaExclamationTriangle /> }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    navigate('/report', { state: { type } });
  };

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <LogoWrapper>
          <LogoImg src={logo} alt="CrimeAlert Logo" />
        </LogoWrapper>
        <Title>Incident Dashboard</Title>
        <Subtitle>
          Select the type of incident you'd like to report. Your reports help keep Victoria Falls safe.
        </Subtitle>

        <TilesGrid>
          {incidentTypes.map((item, index) => (
            <Tile key={index} onClick={() => handleClick(item.type)}>
              <TileIcon>{item.icon}</TileIcon>
              <TileTitle>{item.type}</TileTitle>
            </Tile>
          ))}
        </TilesGrid>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;