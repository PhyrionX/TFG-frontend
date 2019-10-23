import React, { useState } from 'react';
import moment from 'moment';
import './table.scss';

export default function Table({ columns, data, onRowClick }) {
  function renderTd(type, value) {
    let rend = '';
    switch (type) {
      case 'date':
        rend =  moment(value).format('MMMM Do YYYY, h:mm:ss a')
        break;
      default:
        rend = value;
    }

    return rend;
  }

  return (
    <table className="table tfg-table">
      <thead>
        <tr>
          { columns.map((column, index) => 
              <th key={ index }>{ column.label }</th>) }
        </tr>
      </thead>
      <tbody>
        { data && data.map((row, index) =>
            <tr key={ index }>
              { columns.map((column, indexCol) =>
                  <td className={ `${ onRowClick ? 'tfg-table__td--clickable' : '' }` } key={ indexCol + index } onClick={ () => onRowClick && onRowClick(row) }>{ renderTd(column.type, row[column.key]) }</td>) }
            </tr>) }
      </tbody>
    </table>
  )
}