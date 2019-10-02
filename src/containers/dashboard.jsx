import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import { getSuggestions, getFiendTimeline } from '../services/twitterService';
import Card from '../components/card/Card';
import Input from '../components/commons/input';

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    
    // getFiendTimeline('realmadrid');
  },[])

  function handleOnKeyPress(event) {
    setSearch(event.target.value);

   if (event.target.value) {
    getSuggestions(event.target.value)
      .then(({data}) => {  
        console.log(data);
         
        setSuggestions(data.result);
      })
   }
  }
  console.log(suggestions);
  
  return <React.Fragment>
    <Card content={ 
      <Input onKeyPress={ handleOnKeyPress }/>
     }/>
    <Card title={ search } content={
      suggestions.length > 0 && (<ul>
        { suggestions.map((suggest, index) => <li key={ index }>{suggest.screen_name}</li>) }
      </ul>) 
    }/>
  </React.Fragment>
}
