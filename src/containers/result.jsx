import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/Card';
import Table from '../components/commons/table';
import { getSavedSearch, getAnalitycInfo, getHistory } from '../services/twitterService';
import DetailList from '../components/detail_list/detail-list';
import TweetsAnalitycs from '../components/analitycs/tweets-analitycs';
import Input from '../components/commons/input';

export default function Result(props) {
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  // const [savedTweet, setSavedTweet] = useState({})
  const [savedSearch, setSavedSearch] = useState({});
  const [savedAnalitycInfo, setSavedAnalitycInfo] = useState({});
  const [compared, setCompared] = useState(false);
  const [itemsGeneral, setItemsGeneral] = useState([]);
  const [infoTotals, setInfoTotals] = useState([]);
  const [itemsReplies, setItemsReplies] = useState([]);

  const [savedSearch2, setSavedSearch2] = useState({});
  const [savedAnalitycInfo2, setSavedAnalitycInfo2] = useState({});
  const [itemsGeneral2, setItemsGeneral2] = useState([]);
  const [infoTotals2, setInfoTotals2] = useState([]);
  const [itemsReplies2, setItemsReplies2] = useState([]);
  const [history, setHistory] = useState([]);


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

        // const totalReplies = data.replies ? data.replies.reduce((acc, curr) => acc + curr.replies, 0) : 0;
        
        // const dataGeneral = [
        //   {
        //     key: 'tweet',
        //     title: 'Tweets',
        //     value: data.ownPosts || 0,
        //     icon: 'fab fa-twitter',

        //   },
        //   {
        //     key: 'shared',
        //     title: 'Shared',
        //     value: data.sharePosts || 0,
        //   },
        //   {
        //     key: 'fav',
        //     title: 'Favourites',
        //     value: data.favoritesTotal || 0,
        //     icon: 'fas fa-heart'
        //   },
        //   {
        //     key: 'ret',
        //     title: 'Retweets',
        //     value: data.retweetsTotal || 0,
        //     icon:  'fas fa-retweet'
        //   },
        //   {
        //     key: 'rep',
        //     title: 'Replies',
        //     value: totalReplies,
        //     icon:  'fas fa-reply'
        //   },
        //   {
        //     key: 'men',
        //     title: 'Mentions',
        //     value: data.userMentionsTotal || 0,
        //     icon:  'fas fa-at'
        //   },
        //   {
        //     key: 'hash',
        //     title: 'Hashtags',
        //     value: data.hashtagsTotal || 0,
        //     icon:  'fas fa-hashtag'
        //   },
        //   {
        //     key: 'med',
        //     title: 'Media',
        //     value: data.mediasTotal || 0,
        //     icon: 'fas fa-images'
        //   },
        //   {
        //     key: 'url',
        //     title: 'Urls',
        //     value: data.urlsTotal || 0,
        //     icon: 'fas fa-link'
        //   }
        // ]

        // const infoReplies = [
        //   {
        //     key: 'repl',
        //     title: 'Total Replies',
        //     value: totalReplies,
        //     icon:  'fas fa-reply'
        //   },
        //   {
        //     key: 'average',
        //     title: 'Average Replies',
        //     value: data.replies ? (totalReplies / data.replies.length).toFixed(2) : 0
        //   },
        //   {
        //     key: 'reptwe',
        //     title: 'Tweet+Replies',
        //     value: data.replies ? data.replies.length : 0,
        //   },
        //   {
        //     key: 'pos',
        //     title: 'Positives',
        //     value: data.replies ? data.replies.reduce((acc, curr) => curr.positive + acc, 0) : 0,
        //     icon:  'fas fa-thumbs-up'
        //   },
        //   {
        //     key: 'neg',
        //     title: 'Negatives',
        //     value: data.replies ? data.replies.reduce((acc, curr) => curr.negative + acc, 0) : 0,
        //     icon:  'fas fa-thumbs-down'
        //   },
        //   {
        //     key: 'neu',
        //     title: 'Neutral',
        //     value: data.replies ? data.replies.reduce((acc, curr) => curr.neutral + acc, 0) : 0,
        //     icon:  'fas fa-meh'
        //   },
        //   {
        //     key: 'scpos',
        //     title: 'Tw Score Positive',
        //     value: data.replies ? data.replies.filter(el => el.score > 0).length : 0
        //   },
        //   {
        //     key: 'neu',
        //     title: 'Tw Score Neutral',
        //     value: data.replies ? data.replies.filter(el => el.score === 0).length : 0
        //   },
        //   {
        //     key: 'neu',
        //     title: 'Tw Score Negative',
        //     value: data.replies ? data.replies.filter(el => el.score < 0).length : 0
        //   },
        // ]

        // const infot = [
        //   {
        //     key: 'repl',
        //     title: 'Only Text',
        //     value: data.totals ? data.totals.onlyText : 0
        //   },
        //   {
        //     key: 'average',
        //     title: 'Only Image',
        //     value: data.totals ? data.totals.onlyImage : 0
        //   },
        //   {
        //     key: 'reptwe',
        //     title: 'Text and Image',
        //     value: data.totals ? data.totals.textAndImage : 0
        //   },
        //   {
        //     key: 'pos',
        //     title: 'Text, Image and URL',
        //     value: data.totals ? data.totals.textAndImageAndUrl : 0
        //   },
        //   {
        //     key: 'neg',
        //     title: 'Only Video',
        //     value: data.totals ? data.totals.onlyVideo : 0
        //   },
        //   {
        //     key: 'neu',
        //     title: 'Text and Video',
        //     value: data.totals ? data.totals.textAndVideo : 0
        //   },
        //   {
        //     key: 'scpos',
        //     title: 'Text, Video and URL',
        //     value: data.totals ? data.totals.textAndVideoAndUrl : 0
        //   },
        //   {
        //     key: 'neu',
        //     title: 'Text and URL',
        //     value: data.totals ? data.totals.textAndUrls : 0
        //   }
        // ];

        
        // original ? setInfoTotals(infot) : setInfoTotals2(infot);
        // original ? setItemsGeneral(dataGeneral) : setItemsGeneral2(dataGeneral);
        // original ? setItemsReplies(infoReplies) : setItemsReplies2(infoReplies);
        
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
      key: "Description",
      value: savedSearch.description
    },
    {
      key: "Followers",
      value: savedSearch.followers_count,
      diff: compareMode && savedSearch2.followers_count && savedSearch.followers_count - savedSearch2.followers_count
    },
    {
      key: "Follow",
      value: savedSearch.friends_count,
      diff: compareMode && savedSearch2.friends_count && savedSearch.friends_count - savedSearch2.friends_count
    },
    {
      key: "Tweets",
      value: savedSearch.statuses_count,
      diff: compareMode && savedSearch2.statuses_count && savedSearch.statuses_count - savedSearch2.statuses_count
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
    setCompared(false);
    setCompareMode(!compareMode);
    getHistory()
    .then(({data}) => setHistory(data.reverse()))
    .catch((err) => console.log(err));
    // getSavedSearch('5de6afa6c1be383e48f0be12')
    //   .then(({data}) => {
    //     setSavedSearch2(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => console.error(err));
    //   getAnalitycInfoData(false, '5de6afa6c1be383e48f0be12')
  }

  function loadCompare(id) {
    getSavedSearch(id)
      .then(({data}) => {
        setSavedSearch2(data);
        setLoading(false);
        setCompared(true);
      })
      .catch((err) => console.error(err));
      getAnalitycInfoData(false, id)
  }

  const totalReplies = savedAnalitycInfo.replies ? savedAnalitycInfo.replies.reduce((acc, curr) => acc + curr.replies, 0) : 0;
  const totalReplies2 = savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.reduce((acc, curr) => acc + curr.replies, 0) : 0;
console.log('r1', savedAnalitycInfo.replies);
console.log('r2', savedAnalitycInfo2.replies);

  
  const dataGeneral = [
    {
      key: 'tweet',
      title: 'Tweets',
      value: savedAnalitycInfo.ownPosts || 0,
      icon: 'fab fa-twitter',
      diff: compareMode && savedAnalitycInfo2.ownPosts && savedAnalitycInfo.ownPosts - savedAnalitycInfo2.ownPosts 
    },
    {
      key: 'shared',
      title: 'Shared',
      value: savedAnalitycInfo.sharePosts || 0,
      diff: compareMode && savedAnalitycInfo2.sharePosts && savedAnalitycInfo.sharePosts - savedAnalitycInfo2.sharePosts 
    },
    {
      key: 'fav',
      title: 'Favourites',
      value: savedAnalitycInfo.favoritesTotal || 0,
      icon: 'fas fa-heart',
      diff: compareMode && savedAnalitycInfo2.favoritesTotal && savedAnalitycInfo.favoritesTotal - savedAnalitycInfo2.favoritesTotal 
    },
    {
      key: 'ret',
      title: 'Retweets',
      value: savedAnalitycInfo.retweetsTotal || 0,
      icon:  'fas fa-retweet',
      diff: compareMode && savedAnalitycInfo2.retweetsTotal && savedAnalitycInfo.retweetsTotal - savedAnalitycInfo2.retweetsTotal 
    },
    {
      key: 'rep',
      title: 'Replies',
      value: totalReplies,
      icon:  'fas fa-reply',
      diff: compareMode && totalReplies2 && totalReplies - totalReplies2 
    },
    {
      key: 'men',
      title: 'Mentions',
      value: savedAnalitycInfo.userMentionsTotal || 0,
      icon:  'fas fa-at',
      diff: compareMode && savedAnalitycInfo2.userMentionsTotal && savedAnalitycInfo.userMentionsTotal - savedAnalitycInfo2.userMentionsTotal 
    },
    {
      key: 'hash',
      title: 'Hashtags',
      value: savedAnalitycInfo.hashtagsTotal || 0,
      icon:  'fas fa-hashtag',
      diff: compareMode && savedAnalitycInfo2.hashtagsTotal && savedAnalitycInfo.hashtagsTotal - savedAnalitycInfo2.hashtagsTotal 
    },
    {
      key: 'med',
      title: 'Media',
      value: savedAnalitycInfo.mediasTotal || 0,
      icon: 'fas fa-images',
      diff: compareMode && savedAnalitycInfo2.mediasTotal && savedAnalitycInfo.mediasTotal - savedAnalitycInfo2.mediasTotal 
    },
    {
      key: 'url',
      title: 'Urls',
      value: savedAnalitycInfo.urlsTotal || 0,
      icon: 'fas fa-link',
      diff: compareMode && savedAnalitycInfo2.urlsTotal && savedAnalitycInfo.urlsTotal - savedAnalitycInfo2.urlsTotal 
    }
  ]

  const infoReplies = [
    {
      key: 'repl',
      title: 'Total Replies',
      value: totalReplies,
      icon:  'fas fa-reply',
      diff: compareMode && totalReplies2 && totalReplies - totalReplies2 
    },
    {
      key: 'average',
      title: 'Average Replies',
      value: savedAnalitycInfo.replies ? (totalReplies / savedAnalitycInfo.replies.length).toFixed(2) : 0,
      diff: compareMode && savedAnalitycInfo2.replies && ((totalReplies / savedAnalitycInfo.replies.length).toFixed(2)) - ((totalReplies2 / savedAnalitycInfo2.replies.length).toFixed(2)) 
    },
    {
      key: 'reptwe',
      title: 'Tweet+Replies',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.length : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.length - savedAnalitycInfo2.replies.length
    },
    {
      key: 'pos',
      title: 'Positives',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.reduce((acc, curr) => curr.positive + acc, 0) : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.reduce((acc, curr) => curr.positive + acc, 0) - savedAnalitycInfo2.replies.reduce((acc, curr) => curr.positive + acc, 0),
      icon:  'fas fa-thumbs-up'
    },
    {
      key: 'neg',
      title: 'Negatives',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.reduce((acc, curr) => curr.negative + acc, 0) : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.reduce((acc, curr) => curr.negative + acc, 0) - savedAnalitycInfo2.replies.reduce((acc, curr) => curr.negative + acc, 0),
      icon:  'fas fa-thumbs-down'
    },
    {
      key: 'neu',
      title: 'Neutral',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.reduce((acc, curr) => curr.neutral + acc, 0) : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.reduce((acc, curr) => curr.neutral + acc, 0) - savedAnalitycInfo2.replies.reduce((acc, curr) => curr.neutral + acc, 0),
      icon:  'fas fa-meh'
    },
    {
      key: 'scpos',
      title: 'Tw Score Positive',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.filter(el => el.score > 0).length : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.filter(el => el.score > 0).length - savedAnalitycInfo2.replies.filter(el => el.score > 0).length,
    },
    {
      key: 'neu',
      title: 'Tw Score Neutral',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.filter(el => el.score === 0).length : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.filter(el => el.score === 0).length - savedAnalitycInfo2.replies.filter(el => el.score === 0).length,
    },
    {
      key: 'neu',
      title: 'Tw Score Negative',
      value: savedAnalitycInfo.replies ? savedAnalitycInfo.replies.filter(el => el.score < 0).length : 0,
      diff: compareMode && savedAnalitycInfo2.replies && savedAnalitycInfo.replies.filter(el => el.score < 0).length - savedAnalitycInfo2.replies.filter(el => el.score < 0).length
    },
  ]

  const infot = [
    {
      key: 'repl',
      title: 'Only Text',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.onlyText : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.onlyText - savedAnalitycInfo2.totals.onlyText
    },
    {
      key: 'average',
      title: 'Only Image',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.onlyImage : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.onlyImage - savedAnalitycInfo2.totals.onlyImage
    },
    {
      key: 'reptwe',
      title: 'Text and Image',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.textAndImage : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.textAndImage - savedAnalitycInfo2.totals.textAndImage
    },
    {
      key: 'pos',
      title: 'Text, Image and URL',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.textAndImageAndUrl : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.textAndImageAndUrl - savedAnalitycInfo2.totals.textAndImageAndUrl
    },
    {
      key: 'neg',
      title: 'Only Video',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.onlyVideo : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.onlyVideo - savedAnalitycInfo2.totals.onlyVideo
    },
    {
      key: 'neu',
      title: 'Text and Video',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.textAndVideo : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.textAndVideo - savedAnalitycInfo2.totals.textAndVideo
    },
    {
      key: 'scpos',
      title: 'Text, Video and URL',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.textAndVideoAndUrl : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.textAndVideoAndUrl - savedAnalitycInfo2.totals.textAndVideoAndUrl
    },
    {
      key: 'neu',
      title: 'Text and URL',
      value: savedAnalitycInfo.totals ? savedAnalitycInfo.totals.textAndUrls : 0,
      diff: compareMode && savedAnalitycInfo2.totals && savedAnalitycInfo.totals.textAndUrls - savedAnalitycInfo2.totals.textAndUrls
    }
  ];

  const dataGeneral2 = [
    {
      key: 'tweet',
      title: 'Tweets',
      value: savedAnalitycInfo2.ownPosts || 0,
      icon: 'fab fa-twitter',

    },
    {
      key: 'shared',
      title: 'Shared',
      value: savedAnalitycInfo2.sharePosts || 0,
    },
    {
      key: 'fav',
      title: 'Favourites',
      value: savedAnalitycInfo2.favoritesTotal || 0,
      icon: 'fas fa-heart'
    },
    {
      key: 'ret',
      title: 'Retweets',
      value: savedAnalitycInfo2.retweetsTotal || 0,
      icon:  'fas fa-retweet'
    },
    {
      key: 'rep',
      title: 'Replies',
      value: totalReplies2,
      icon:  'fas fa-reply'
    },
    {
      key: 'men',
      title: 'Mentions',
      value: savedAnalitycInfo2.userMentionsTotal || 0,
      icon:  'fas fa-at'
    },
    {
      key: 'hash',
      title: 'Hashtags',
      value: savedAnalitycInfo2.hashtagsTotal || 0,
      icon:  'fas fa-hashtag'
    },
    {
      key: 'med',
      title: 'Media',
      value: savedAnalitycInfo2.mediasTotal || 0,
      icon: 'fas fa-images'
    },
    {
      key: 'url',
      title: 'Urls',
      value: savedAnalitycInfo2.urlsTotal || 0,
      icon: 'fas fa-link'
    }
  ]

  const infoReplies2 = [
    {
      key: 'repl',
      title: 'Total Replies',
      value: totalReplies2,
      icon:  'fas fa-reply'
    },
    {
      key: 'average',
      title: 'Average Replies',
      value: savedAnalitycInfo2.replies ? (totalReplies2 / savedAnalitycInfo2.replies.length).toFixed(2) : 0
    },
    {
      key: 'reptwe',
      title: 'Tweet+Replies',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.length : 0,
    },
    {
      key: 'pos',
      title: 'Positives',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.reduce((acc, curr) => curr.positive + acc, 0) : 0,
      icon:  'fas fa-thumbs-up'
    },
    {
      key: 'neg',
      title: 'Negatives',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.reduce((acc, curr) => curr.negative + acc, 0) : 0,
      icon:  'fas fa-thumbs-down'
    },
    {
      key: 'neu',
      title: 'Neutral',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.reduce((acc, curr) => curr.neutral + acc, 0) : 0,
      icon:  'fas fa-meh'
    },
    {
      key: 'scpos',
      title: 'Tw Score Positive',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.filter(el => el.score > 0).length : 0
    },
    {
      key: 'neu',
      title: 'Tw Score Neutral',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.filter(el => el.score === 0).length : 0
    },
    {
      key: 'neu',
      title: 'Tw Score Negative',
      value: savedAnalitycInfo2.replies ? savedAnalitycInfo2.replies.filter(el => el.score < 0).length : 0
    },
  ]

  const infot2 = [
    {
      key: 'repl',
      title: 'Only Text',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.onlyText : 0
    },
    {
      key: 'average',
      title: 'Only Image',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.onlyImage : 0
    },
    {
      key: 'reptwe',
      title: 'Text and Image',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.textAndImage : 0
    },
    {
      key: 'pos',
      title: 'Text, Image and URL',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.textAndImageAndUrl : 0
    },
    {
      key: 'neg',
      title: 'Only Video',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.onlyVideo : 0
    },
    {
      key: 'neu',
      title: 'Text and Video',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.textAndVideo : 0
    },
    {
      key: 'scpos',
      title: 'Text, Video and URL',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.textAndVideoAndUrl : 0
    },
    {
      key: 'neu',
      title: 'Text and URL',
      value: savedAnalitycInfo2.totals ? savedAnalitycInfo2.totals.textAndUrls : 0
    }
  ];
  

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
              itemsGeneral={ dataGeneral }
              itemsReplies={ infoReplies }
              infoTotals={ infot }
              compare={ compareMode }/>
        </div>
        {
          compareMode && compared ?(
          <div className="tfg-page-result__result2">
            <Card content={ (
            <React.Fragment>
              <img src={ savedSearch2.profile_image_url } />
              <h2>{ savedSearch2.name }</h2>
              <DetailList items={ itemsDetails2 } />
            </React.Fragment>
          ) }/>
          <TweetsAnalitycs analitycInfo={ savedAnalitycInfo2 }
              refreshTweetsData={ getAnalitycInfoData }
              itemsGeneral={ dataGeneral2 }
              infoTotals={ infot2 }
              itemsReplies={ infoReplies2 }
              compare={ compareMode }/>
          </div>) : <div className="tfg-page-result__result2">
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
        onRowClick={ (row) => loadCompare(row._id ) }  
        data={ history } />
    } />
          </div>
        }
      </div>
  </div>)
}