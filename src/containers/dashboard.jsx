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
        setSuggestions(data.result);
      })
   }
  }

  function handleGetInfoOfAcount(screenName) {
    getFiendTimeline(screenName)
      .then(({data}) => {
        console.log(data);
      })

  }

  return <React.Fragment>
    <Card content={ 
      <Input onKeyPress={ handleOnKeyPress }/>
     }/>
    
    { suggestions.length > 0 && (<div className="tfg-grid ">
        { suggestions.map((suggest, index) => (
            <Card infoProfileCard
                onClick={ () => handleGetInfoOfAcount(suggest.screen_name) }
                key={ index }
                title={suggest.screen_name} />) 
          ) }
      </div>)
    }
  </React.Fragment>
}
