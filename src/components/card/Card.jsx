import React from 'react'


export default function Card({ title, content, infoProfileCard }) {
  return (
    <div className={ `tfg-card ${ infoProfileCard ? 'infoProfileCarda' : '' }`}>
      { title  && (<div className="tfg-card__heading">
        { title }
      </div>) } 
      { content && (<div className="tfg-card__body">
        { content }
      </div>) }
    </div>
  )
}