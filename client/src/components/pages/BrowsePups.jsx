import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import { getToken } from '../../lib/auth';

const PupCard = ({ pup, onMatch, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInfoClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMatchClick = () => {
    onMatch(pup);
    setIsFlipped(false);
  };

  const handleNextClick = () => {
    onNext();
    setIsFlipped(false);
  };

  return (
    <div className="card-container">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card front">
          <img src={pup.image || 'placeholder.png'} alt={pup.pupName} className='card-img-top' style={{ height: '400px', objectFit: 'cover' }} />
          <div className="card-body d-flex justify-content-between">
            <button className="btn btn-info" onClick={handleInfoClick}>
              📖
            </button>
            <button className="btn btn-success" onClick={handleMatchClick}>
              🦴
            </button>
            <button className="btn btn-secondary" onClick={handleNextClick}>
              ➡️
            </button>
          </div>
        </div>
        <div className="card back">
          <div className="card-body">
            <h3 className="card-title">{pup.pupName}</h3>
            <p className="card-text">{pup.bio}</p>
            <button className="btn btn-info" onClick={handleInfoClick}>
              📖
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};



export default function BrowsePups() {
  const [currentPupIndex, setCurrentPupIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [pups, setPups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPups() {
      try {
        const { data } = await axios.get('/api/pups', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        console.log('Fetched pups:', data);
        setPups(data);
      } catch (error) {
        console.log('Error:', error);
        setError(error.message);
      }
    }
    fetchPups();
  }, []);

  const handleMatch = (pup) => {
    setMatches([...matches, pup]);
    setPups((prevPups) => prevPups.filter((p) => p._id !== pup._id));
    setCurrentPupIndex(0);
  };


  const handleNext = () => {
    setCurrentPupIndex((prevIndex) => (prevIndex + 1) % pups.length);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (pups.length === 0) {
    return <div>No more pups to display</div>;
  }

  return (
    <div>
      {pups.length > 0 ? (
        <>
          <PupCard
            pup={pups[currentPupIndex]}
            onMatch={handleMatch}
            onNext={handleNext}
          />
          <h2>Matches:</h2>
          <ul>
            {matches.map((match, index) => (
              <li key={index}>{match.pupName}</li>
            ))}
          </ul>
        </>
      ) : (
        <h1>No more pups to display</h1>
      )}
    </div>
  );
}
