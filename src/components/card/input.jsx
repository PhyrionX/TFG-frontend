import React from 'react'


export default function Card({ title, content }) {
  return (
    <div className="tfg-card">
      <div className="tfg-card__heading">
        { title }
      </div>
      <div className="tfg-card__body">
        { content }
      </div>
    </div>
  )
}