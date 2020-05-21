import React from 'react';
import './Card.scss';

export default function Card({ title, content, infoProfileCard, onClick }) {
  return (
    <div className={ `tfg-card ${ infoProfileCard ? 'infoProfileCard' : '' }`}
      onClick={ onClick }>
      { title  && (<div className="tfg-card__heading">
        { title }
      </div>) } 
      { content && (<div className="tfg-card__body">
        { content }
      </div>) }
    </div>
  )
}