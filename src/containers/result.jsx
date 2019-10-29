import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/Card';
import Table from '../components/commons/table';
import { getSavedSearch, getAnalitycInfo } from '../services/twitterService';
import DetailList from '../components/detail_list/detail-list';
import TweetsAnalitycs from '../components/analitycs/tweets-analitycs';
import Input from '../components/commons/input';

export default function Result(props) {
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [savedSearch, setSavedSearch] = useState({});
  // const [savedTweet, setSavedTweet] = useState({})
  const [savedAnalitycInfo, setSavedAnalitycInfo] = useState({})

  useEffect(() => {
    getSavedSearch(props.match.params.idSearch)
      .then(({data}) => {
        setSavedSearch(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      
    getAnalitycInfoData();
  }, []);
    
  function getAnalitycInfoData() {
    setSavedAnalitycInfo({});

    getAnalitycInfo(props.match.params.idSearch)
      .then(({data}) => {
        setSavedAnalitycInfo(data);
      })
      .catch((err) => console.error(err));
  }

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
    
  ];
  
  function handleCompare() {
    setCompareMode(!compareMode);
  }

  return loading ? 'Loading...' : (<div className="tfg-page-result">
      <div className="tfg-page-result__navigation-bar">
        <button className="btn btn-primary" onClick={handleCompare}>{ compareMode ? 'Cancel Compare' : 'Compare' }</button>
      </div>
      <div className={ compareMode ? 'tfg-page-result__results' : '' }>
        <div className={ compareMode ? 'tfg-page-result__result1' : '' }>
          <Card content={ (
            <React.Fragment>
              <img src={ savedSearch.profile_image_url } />
              <h2>{ savedSearch.name }</h2>
              <DetailList items={ itemsDetails } />
            </React.Fragment>
          ) }/>
          <TweetsAnalitycs analitycInfo={ savedAnalitycInfo } refreshTweetsData={ getAnalitycInfoData } compare={ compareMode }/>
        </div>
        {
          compareMode && (<div className="tfg-page-result__result2">
            <Input placeholder="Search twitter account..."/>
          </div>)
        }
      </div>
  </div>)
}