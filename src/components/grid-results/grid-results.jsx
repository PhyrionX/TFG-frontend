import React from 'react';
import InfoProfileCard from '../card/info-profile-card';
import './grid-results.scss';

export default function GridResults({ suggestions , onClick }) {
  return (
    suggestions.length > 0 && (<div className="tfg-grid ">
        {suggestions.map((suggest, index) => (
          <InfoProfileCard infoProfileCard
            onClick={() => onClick(suggest.screen_name)}
            key={index}
            info={ suggest } />)
        )}
      </div>)
  )
}