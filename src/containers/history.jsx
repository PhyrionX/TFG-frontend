import React, { useState, useEffect } from 'react';
import { getSuggestions, getFiendTimeline, getHistory } from '../services/twitterService';
import Card from '../components/card/Card';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory()
      .then(({data}) => setHistory(data))
      .then((err) => console.log(err));
  },[])

  return <React.Fragment>
    <Card title="Text title" content={ (
      <table className="table">
      <thead>
        <tr>
          <th scope="col">Id Twitter</th>
          <th scope="col">Screen Name</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        { history.reverse().map((row, index) => (
          <tr key={ index }>
            <td>{ row.id_twitter }</td>
            <td>{ row.screen_name }</td>
            <td>{ row.name }</td>
            <td>{ row.description }</td>
          </tr>
        )) }
      </tbody>
    </table>
    ) } />
  </React.Fragment>
}
