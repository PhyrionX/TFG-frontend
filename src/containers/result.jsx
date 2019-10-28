import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/Card';
import Table from '../components/commons/table';
import { getSavedSearch, getSavedTweet } from '../services/twitterService';
import DetailList from '../components/detail_list/detail-list';
import TweetsAnalitycs from '../components/analitycs/tweets-analitycs';
import Input from '../components/commons/input';

export default function Result(props) {
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [savedSearch, setSavedSearch] = useState({});
  const [savedTweet, setSavedTweet] = useState({})

  useEffect(() => {
    getSavedSearch(props.match.params.idSearch)
      .then(({data}) => {
        setSavedSearch(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      
    getTweetsData();
  }, []);
    
  function getTweetsData() {
    setSavedTweet({});

    getSavedTweet(props.match.params.idSearch)
      .then(({data}) => {
        setSavedTweet(getTweetsInfo(data));
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
  
  function getTweetsInfo(tweet) {
    const analitycsTweets = tweet.tweets.reduce((acc, curr) => ({
        ...acc,
        tweets: [ ...acc.tweets, curr ],
        hashtagsTotal: acc.hashtagsTotal + curr.entities.hashtags.length,
        hashtags: [...acc.hashtags, ...curr.entities.hashtags.map(el => el.text)],
        repliesTotal: curr.replies ? acc.repliesTotal + curr.replies.length : acc.repliesTotal + 0,
        mediasTotal: curr.entities.media ? acc.mediasTotal + curr.entities.media.length : acc.mediasTotal + 0,
        urlsTotal: acc.urlsTotal + curr.entities.urls.length,
        userMentionsTotal: acc.userMentionsTotal + curr.entities.user_mentions.length,
        userMentions: [...acc.userMentions, ...curr.entities.user_mentions.map(el => el.screen_name)],
        favoritesTotal: acc.favoritesTotal + curr.favorite_count,
        retweetsTotal: acc.retweetsTotal + curr.retweet_count
      })
    , {
      tweets: [],
      repliesTotal: 0,
      mediasTotal: 0,
      urlsTotal: 0,
      userMentions: [],
      userMentionsTotal: 0,
      hashtags: [],
      hashtagsTotal: 0,
      favoritesTotal: 0,
      retweetsTotal: 0,
      state: tweet.state,
      dateInit: tweet.tweets.length > 0 && tweet.tweets[tweet.tweets.length - 1].created_at,
      dateEnd: tweet.tweets.length > 0 &&  tweet.tweets[0].created_at
    });

    analitycsTweets.userMentionsGrouped = analitycsTweets.userMentions.reduce(groupCount2, []);
    analitycsTweets.hashtagsGrouped = analitycsTweets.hashtags.reduce(groupCount2, []);

    return analitycsTweets;
  }

  function groupCount(acc, curr) {
    acc[curr] = (acc[curr] || 0) + 1;
      
    return acc;
  }

  function groupCount2(acc, curr) {
    return !acc.find((el) => el.value === curr) ? [...acc, { value: curr, count: 1 }]
    : acc.map((el) => el.value === curr ? { ...el, count: el.count + 1 } : el);
  }

  console.log(savedTweet.tweets && savedTweet.tweets, savedTweet.state);
  
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
          <TweetsAnalitycs tweets={savedTweet} refreshTweetsData={ getTweetsData } />
        </div>
        {
          compareMode && (<div className="tfg-page-result__result2">
            <Input placeholder="Search twitter account..."/>
          </div>)
        }
      </div>
  </div>)
}