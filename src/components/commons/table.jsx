import React, { useState } from 'react';
import moment from 'moment';

export default function Table({ columns, data }) {
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
    <table className="table">
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
                  <td key={ indexCol + index }>{ renderTd(column.type, row[column.key]) }</td>) }
            </tr>) }
      </tbody>
    </table>
  )
}