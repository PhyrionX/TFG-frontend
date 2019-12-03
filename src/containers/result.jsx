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
  // const [savedTweet, setSavedTweet] = useState({})
  const [savedSearch, setSavedSearch] = useState({});
  const [savedAnalitycInfo, setSavedAnalitycInfo] = useState({});
  const [itemsGeneral, setItemsGeneral] = useState([]);
  const [infoTotals, setInfoTotals] = useState([]);
  const [itemsReplies, setItemsReplies] = useState([]);

  const [savedSearch2, setSavedSearch2] = useState({});
  const [savedAnalitycInfo2, setSavedAnalitycInfo2] = useState({});
  const [itemsGeneral2, setItemsGeneral2] = useState([]);
  const [infoTotals2, setInfoTotals2] = useState([]);
  const [itemsReplies2, setItemsReplies2] = useState([]);

  useEffect(() => {
    getSavedSearch(props.match.params.idSearch)
      .then(({data}) => {
        setSavedSearch(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      
    getAnalitycInfoData(true);
  }, []);
    
  function getAnalitycInfoData(original, id) {
    original ? setSavedAnalitycInfo({}) : setSavedAnalitycInfo2({});

    getAnalitycInfo(original ? props.match.params.idSearch : id)
      .then(({data}) => {
        original ? setSavedAnalitycInfo(data) : setSavedAnalitycInfo2(data);

        const totalReplies = data.replies ? data.replies.reduce((acc, curr) => acc + curr.replies, 0) : 0;
        
        const dataGeneral = [
          {
            key: 'tweet',
            title: 'Tweets',
            value: data.ownPosts || 0,
            icon: 'fab fa-twitter',

          },
          {
            key: 'shared',
            title: 'Shared',
            value: data.sharePosts || 0,
          },
          {
            key: 'fav',
            title: 'Favourites',
            value: data.favoritesTotal || 0,
            icon: 'fas fa-heart'
          },
          {
            key: 'ret',
            title: 'Retweets',
            value: data.retweetsTotal || 0,
            icon:  'fas fa-retweet'
          },
          {
            key: 'rep',
            title: 'Replies',
            value: totalReplies,
            icon:  'fas fa-reply'
          },
          {
            key: 'men',
            title: 'Mentions',
            value: data.userMentionsTotal || 0,
            icon:  'fas fa-at'
          },
          {
            key: 'hash',
            title: 'Hashtags',
            value: data.hashtagsTotal || 0,
            icon:  'fas fa-hashtag'
          },
          {
            key: 'med',
            title: 'Media',
            value: data.mediasTotal || 0,
            icon: 'fas fa-images'
          },
          {
            key: 'url',
            title: 'Urls',
            value: data.urlsTotal || 0,
            icon: 'fas fa-link'
          }
        ]

        const infoReplies = [
          {
            key: 'repl',
            title: 'Total Replies',
            value: totalReplies,
            icon:  'fas fa-reply'
          },
          {
            key: 'average',
            title: 'Average Replies',
            value: data.replies ? (totalReplies / data.replies.length).toFixed(2) : 0
          },
          {
            key: 'reptwe',
            title: 'Tweet+Replies',
            value: data.replies ? data.replies.length : 0,
          },
          {
            key: 'pos',
            title: 'Positives',
            value: data.replies ? data.replies.reduce((acc, curr) => curr.positive + acc, 0) : 0,
            icon:  'fas fa-thumbs-up'
          },
          {
            key: 'neg',
            title: 'Negatives',
            value: data.replies ? data.replies.reduce((acc, curr) => curr.negative + acc, 0) : 0,
            icon:  'fas fa-thumbs-down'
          },
          {
            key: 'neu',
            title: 'Neutral',
            value: data.replies ? data.replies.reduce((acc, curr) => curr.neutral + acc, 0) : 0,
            icon:  'fas fa-meh'
          },
          {
            key: 'scpos',
            title: 'Tw Score Positive',
            value: data.replies ? data.replies.filter(el => el.score > 0).length : 0
          },
          {
            key: 'neu',
            title: 'Tw Score Neutral',
            value: data.replies ? data.replies.filter(el => el.score === 0).length : 0
          },
          {
            key: 'neu',
            title: 'Tw Score Negative',
            value: data.replies ? data.replies.filter(el => el.score < 0).length : 0
          },
        ]

        const infot = [
          {
            key: 'repl',
            title: 'Only Text',
            value: data.totals ? data.totals.onlyText : 0
          },
          {
            key: 'average',
            title: 'Only Image',
            value: data.totals ? data.totals.onlyImage : 0
          },
          {
            key: 'reptwe',
            title: 'Text and Image',
            value: data.totals ? data.totals.textAndImage : 0
          },
          {
            key: 'pos',
            title: 'Text, Image and URL',
            value: data.totals ? data.totals.textAndImageAndUrl : 0
          },
          {
            key: 'neg',
            title: 'Only Video',
            value: data.totals ? data.totals.onlyVideo : 0
          },
          {
            key: 'neu',
            title: 'Text and Video',
            value: data.totals ? data.totals.textAndVideo : 0
          },
          {
            key: 'scpos',
            title: 'Text, Video and URL',
            value: data.totals ? data.totals.textAndVideoAndUrl : 0
          },
          {
            key: 'neu',
            title: 'Text and URL',
            value: data.totals ? data.totals.textAndUrls : 0
          }
        ];

        
        original ? setInfoTotals(infot) : setInfoTotals2(infot);
        original ? setItemsGeneral(dataGeneral) : setItemsGeneral2(dataGeneral);
        original ? setItemsReplies(infoReplies) : setItemsReplies2(infoReplies);
        
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

  const itemsDetails2 = [
    {
      key: "Screen Name",
      value: savedSearch2.screen_name
    },
    {
      key: "Location",
      value: savedSearch2.location
    },
    {
      key: "User Searcher",
      value: savedSearch2.user_searcher
    },
    {
      key: "Description",
      value: savedSearch2.description
    },
    {
      key: "Followers",
      value: savedSearch2.followers_count
    },
    {
      key: "Follow",
      value: savedSearch2.friends_count
    },
    {
      key: "Tweets",
      value: savedSearch2.statuses_count
    }
    
  ];
  
  function handleCompare() {
    setCompareMode(!compareMode);
    getSavedSearch('5dddacce712e7c3838bef61a')
      .then(({data}) => {
        setSavedSearch2(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
      getAnalitycInfoData(false, '5dddacce712e7c3838bef61a')
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
          <TweetsAnalitycs analitycInfo={ savedAnalitycInfo }
              refreshTweetsData={ getAnalitycInfoData }
              itemsGeneral={ itemsGeneral }
              itemsReplies={ itemsReplies }
              infoTotals={ infoTotals }
              compare={ compareMode }/>
        </div>
        {
          compareMode && (<div className="tfg-page-result__result2">
            <Card content={ (
            <React.Fragment>
              <img src={ savedSearch2.profile_image_url } />
              <h2>{ savedSearch2.name }</h2>
              <DetailList items={ itemsDetails2 } />
            </React.Fragment>
          ) }/>
          <TweetsAnalitycs analitycInfo={ savedAnalitycInfo2 }
              refreshTweetsData={ getAnalitycInfoData }
              itemsGeneral={ itemsGeneral2 }
              infoTotals={ infoTotals2 }
              itemsReplies={ itemsReplies2 }
              compare={ compareMode }/>
          </div>)
        }
      </div>
  </div>)
}