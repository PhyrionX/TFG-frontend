import React from 'react';
import './labelled-value-list.scss'

export default function LabelledValueList({ items }) {
  return (
    <ul className="tfg-labelled-value-list">
      { items.map((item, index) => (
        <li key={ item.key + index }>
          <div className="tfg-labelled-value-list__body">  
            <div className="tfg-labelled-value-list__heading">
              { item.title }
            </div>
            <div className="tfg-labelled-value-list__value">
              { item.value }
            </div>
          </div>
          {
            item.icon && <i className={ item.icon } />
          }    
        </li>
      )) }
    </ul>
  )
}