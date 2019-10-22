import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import { getSuggestions, getFriendTimeline } from '../services/twitterService';
import Card from '../components/card/Card';
import Input from '../components/commons/input';
import InfoProfileCard from '../components/card/info-profile-card';

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {

    // getFiendTimeline('realmadrid');
  }, [])

  function handleOnKeyPress(event) {
    setSearch(event.target.value);

    if (event.target.value) {
      getSuggestions(event.target.value)
        .then(({ data }) => {
          setSuggestions(data.result);
        })
    }
  }

  function handleGetInfoOfAcount(screenName) {
    getFriendTimeline(screenName)
      .then(({ data }) => {
        window.location.assign(`#/results/${ data._id }`)
      })

  }

  return <React.Fragment>
    <Card content={
      <Input onKeyPress={handleOnKeyPress} />
    } />

    {suggestions.length > 0 && (<div className="tfg-grid ">
      {suggestions.map((suggest, index) => (
        <InfoProfileCard infoProfileCard
          onClick={() => handleGetInfoOfAcount(suggest.screen_name)}
          key={index}
          info={ suggest } />)
      )}
    </div>)
    }
  </React.Fragment>
}
