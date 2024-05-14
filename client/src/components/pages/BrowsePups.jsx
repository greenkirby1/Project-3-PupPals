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
            <p><strong>Birthday:</strong> {pup.birthday}</p>
            <p><strong>Breed:</strong> {pup.breed}</p>
            <p><strong>Gender:</strong> {pup.gender}</p>
            <p><strong>Neutered:</strong> {pup.neutered ? 'Yes' : 'No'}</p>
            <p><strong>Bio:</strong> {pup.bio}</p>
            <div>
              <h4>Favorites:</h4>
              <ul>
                {pup.favorites.map((favorite, index) => (
                  <li key={index}>{favorite}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Dislikes:</h4>
              <ul>
                {pup.dislikes.map((dislike, index) => (
                  <li key={index}>{dislike}</li>
                ))}
              </ul>
            </div>
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
  const [matchHappened, setMatchHappened] = useState(false);

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

  const handleBoneThrown = async (pup) => {
    try {
      const userId = getToken().sub;
      console.log('Pup object:', pup);
      console.log(userId)
  
      const { data } = await axios.put(`/api/users/${pup.userId}`, {
        bonesThrownBy: [...pup.bonesThrownBy, userId],
        pupId: pup._id
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
  
      setPups((prevPups) => prevPups.filter((p) => p._id !== pup._id));
      setCurrentPupIndex(0);
  
      if (data.bonesThrownBy.includes(userId) && pup.bonesThrownBy.includes(userId)) {
        setMatches((prevMatches) => [...prevMatches, pup]);
        setMatchHappened(true);
      }
    } catch (error) {
      console.log('Error:', error);
      setError(error.message);
    }
  };

    // try {
    //   const userId = getToken().sub;

    //   const { data } = await axios.put(`/api/users/${pup.userId}`, {
    //     bonesThrownBy: [...pup.bonesThrownBy, userId],
    //     pupId: pup._id
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${getToken()}`
    //     }
    //   });

    //   setPups((prevPups) => prevPups.filter((p) => p._id !== pup._id));
      //       setCurrentPupIndex((prevIndex) => (prevIndex >= updatedPups.length ? 0 : prevIndex));
      //       return updatedPups;
      //     });

      //     if (data.bonesThrownBy.includes(pup._id) && pup.bonesThrownBy.includes(userId)) {
      //       setMatches((prevMatches) => [...prevMatches, data]);
      //       setMatchHappened(true);
      //     }
      //   } catch (error) {
      //     console.log('Error:', error);
      //     setError(error.message);
      //   }
      // };


  const handleNext = () => {
    setCurrentPupIndex((prevIndex) => (prevIndex + 1) % pups.length);
  };

  return (
    <div>
      {matchHappened && (
        <div className="banner">
          <h2>YOU HAVE A MATCH!</h2>
        </div>
      )}
      {pups.length > 0 ? (
        <>
          <PupCard
            pup={pups[currentPupIndex]}
            onMatch={handleBoneThrown}
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