import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/Card';
import Table from '../components/commons/table';
import { getSavedSearch } from '../services/twitterService';
import DetailList from '../components/detail_list/detail-list';

export default function Result(props) {
  const [savedSearch, setSavedSearch] = useState({});

  useEffect(() => {
    getSavedSearch(props.match.params.idSearch)
      .then(({data}) => setSavedSearch(data))
      .catch((err) => console.error(err));
  }, []);

  const itemsDetails = [
    {
      key: "Screen Name",
      value: savedSearch.screen_name
    },
    {
      key: "Location",
      value: savedSearch.location
    },
    {
      key: "User Searcher",
      value: savedSearch.user_searcher
    },
    {
      key: "Description",
      value: savedSearch.description
    },
    {
      key: "Followers",
      value: savedSearch.followers_count
    },
    {
      key: "Follow",
      value: savedSearch.friends_count
    },
    {
      key: "Tweets",
      value: savedSearch.statuses_count
    }
    
  ]
  
  
  return <div className="page-configuration">
    <Card content={ (
      <React.Fragment>
        <img src={ savedSearch.profile_image_url } />
        <h2>{ savedSearch.name }</h2>
        <DetailList items={ itemsDetails } />
      </React.Fragment>
    ) }/>
  </div>
}