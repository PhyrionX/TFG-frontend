import React, { useState, useEffect } from 'react';
import { getSuggestions, getFiendTimeline, getHistory } from '../services/twitterService';
import Card from '../components/card/Card';
import Table from '../components/commons/table';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory()
      .then(({data}) => setHistory(data.reverse()))
      .catch((err) => console.log(err));
  },[])

  return <React.Fragment>
    <Card title="History" content={ 
      <Table columns={
          [
            {
              key: 'screen_name',
              label: 'Screen Name'
            },
            {
              key: 'name',
              label: 'Name'
            },
            {
              key: 'description',
              label: 'Description'
            },
            {
              key: 'date_of_search',
              label: 'Date of search',
              type: 'date'
            }
          ]
        }
        onRowClick={ (row) => window.location.assign(`#/results/${ row._id }`) }  
        data={ history } />
    } />
  </React.Fragment>
}
