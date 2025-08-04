import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const FormContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: ${props => props.theme.radii.md};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  button {
    background: none;
    border: none;
    margin-right: 1rem;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    font-size: 1.2rem;
  }

  h2 {
    color: ${props => props.theme.colors.dark};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: ${props => props.theme.colors.dark};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.radii.sm};
  min-height: 150px;
  resize: vertical;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.radii.sm};
  font-size: 0.95rem;
`;

const FileInput = styled.div`
  position: relative;

  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.radii.sm};
    cursor: pointer;

    &:hover {
      background: #e9ecef;
    }
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: ${props => props.theme.radii.sm};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          setPosition(e.target.getLatLng());
        }
      }}
    />
  ) : null;
};

const ReportForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incidentType = location.state?.type || 'Report Incident';

  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [pinLocation, setPinLocation] = useState(null); // Start with null
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-detect location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPinLocation({ lat: latitude, lng: longitude });
      },
      () => {
        // Fallback: Victoria Falls
        setPinLocation({ lat: -17.9318, lng: 25.8400 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.trim().length < 10) {
      alert('Please provide more details. Minimum 10 characters.');
      return;
    }

    if (!pinLocation || !pinLocation.lat || !pinLocation.lng) {
      alert('Please select a valid location on the map.');
      return;
    }

    setIsSubmitting(true);
    try {
      const report = {
        incidentType,
        description,
        location: pinLocation,
        image: image ? image.name : null,
        timestamp: new Date().toISOString(),
      };

      console.log('📤 Submitting report:', report);

      // To integrate with backend later:
      /*
      await fetch('https://your-backend-api.com/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      */

      alert('Report submitted successfully!');
      navigate('/dashboard');
    } catch  {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2>{incidentType}</h2>
      </FormHeader>

      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="description">Incident Details</label>
          <TextArea
            id="description"
            placeholder="Describe what happened..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Pin Exact Location</label>
          <div style={{ height: '300px', borderRadius: '10px', overflow: 'hidden' }}>
            {pinLocation && (
              <MapContainer
                center={pinLocation}
                zoom={17}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker position={pinLocation} setPosition={setPinLocation} />
              </MapContainer>
            )}
          </div>
          {pinLocation && (
            <small>
              📍 Selected: {pinLocation.lat.toFixed(5)}, {pinLocation.lng.toFixed(5)}
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <label>Upload Evidence (Optional)</label>
          <FileInput>
            <label htmlFor="image-upload">
              <FaCamera />
              {image ? image.name : 'Select an image'}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </FileInput>
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default ReportForm;
