import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import { getSuggestions, getFriendTimeline } from '../services/twitterService';
import Card from '../components/card/Card';
import Input from '../components/commons/input';
import InfoProfileCard from '../components/card/info-profile-card';
import GridResults from '../components/grid-results/grid-results';

const AT = 64;

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    // getFiendTimeline('realmadrid');
  }, [])

  function handleOnKeyPress(event) {
    const {value} = event.target;
    
    if (value) {
      if (value.charCodeAt(0) === AT) {
        handleGetInfoOfAcount(value.substring(1))
      } else {
        getSuggestions(value)
          .then(({ data }) => {
            setSuggestions(data.result);
          })
      }
    }
  }

  function handleGetInfoOfAcount(screenName) {
    getFriendTimeline(screenName)
      .then(({ data }) => {
        window.location.assign(`#/results/${ data._id }`)
      })

  }

  return <React.Fragment>
      <Input placeholder="Search twitter account..." onKeyPress={handleOnKeyPress} />

      <GridResults suggestions={ suggestions } onClick={ handleGetInfoOfAcount } />
  </React.Fragment>
}
