import React from 'react';

export default function DetailList({ items }) {
  return (
    <dl className="tfg-detail-list row">
      {
        items.map((item, index) => (
          <React.Fragment key={ `fragment-${index}` }>
            <dt key={ `dt-${index}` } className="col-sm-2">{ item.key }</dt>
            <dd key={ `dd-${index}` } className="col-sm-10">{ item.value }</dd>
          </React.Fragment>
        ))
      }
    </dl>
  )
}