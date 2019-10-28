import React, { useRef, useLayoutEffect, useState } from 'react';
import moment from 'moment';
import ReactModal from 'react-modal';
import { TagCloud } from 'react-tagcloud';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
import Card from '../card/Card';
import './tweets-analitycs.scss';
import LabelledValueList from '../commons/labelled-value-list';

export default function TweetsAnalitycs({ tweets, refreshTweetsData }) {
  const [widthOfCharts, setWidthOfCharts ] = useState(0);
  const [tweetsTimeChart, setTweetsTimeChart ] = useState('DAYS');
  const [tweetsTypeChart, setTweetsTypeChart ] = useState('LINE');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([{id: 1}, {id: 2}]);
  const targetRef = useRef();
  ReactModal.setAppElement('#index')
  // holds the timer for setTimeout and clearInterval
  let movement_timer = null;

  // the number of ms the window size must stay the same size before the
  // dimension state variable is reset
  const RESET_TIMEOUT = 100;

  const test_dimensions = () => {
    // For some reason targetRef.current.getBoundingClientRect was not available
    // I found this worked for me, but unfortunately I can't find the
    // documentation to explain this experience
    if (targetRef.current) {
      setWidthOfCharts(targetRef.current.offsetWidth - 40);
      
      // setDimensions({
      //   width: targetRef.current.offsetWidth,
      //   height: targetRef.current.offsetHeight
      // });
    }
  };

  // This sets the dimensions on the first render
  useLayoutEffect(() => {
    test_dimensions();
  }, []);

  // every time the window is resized, the timer is cleared and set again
  // the net effect is the component will only reset after the window size
  // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // redrawing of the component for more complex components such as charts
  window.addEventListener("resize", () => {
    clearInterval(movement_timer);
    movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
  });
  
  const items = [
    {
      key: 'tweet',
      title: 'Tweets',
      value: tweets.tweets ? tweets.tweets.length : 0,
      icon: 'fab fa-twitter'
    },
    {
      key: 'fav',
      title: 'Favourites',
      value: tweets.favoritesTotal || 0,
      icon: 'fas fa-heart'
    },
    {
      key: 'ret',
      title: 'Retweets',
      value: tweets.retweetsTotal || 0,
      icon:  'fas fa-retweet'
    },
    {
      key: 'rep',
      title: 'Replies',
      value: tweets.repliesTotal || 0,
      icon:  'fas fa-reply'
    },
    {
      key: 'men',
      title: 'Mentions',
      value: tweets.userMentionsTotal || 0,
      icon:  'fas fa-at'
    },
    {
      key: 'hash',
      title: 'Hashtags',
      value: tweets.hashtagsTotal || 0,
      icon:  'fas fa-hashtag'
    },
    {
      key: 'med',
      title: 'Media',
      value: tweets.mediasTotal || 0,
      icon: 'fas fa-images'
    },
    {
      key: 'url',
      title: 'Urls',
      value: tweets.urlsTotal || 0,
      icon: 'fas fa-link'
    }
  ]
  
   
  const newTweetsPerDay = tweets.tweets && tweets.tweets.length > 0 ?
      tweets.tweets.reduce((acc, curr) => {
      const keyName = moment(new Date(curr.created_at)).format(tweetsTimeChart === 'DAYS' ? 'DD-MM-YY' : 'MM-YY');
      
      return acc.map((el) => el.name === keyName ? { 
        ...el,
        onlyText: !curr.entities.media && curr.entities.urls.length === 0 ? el.onlyText + 1 : el.onlyText,
        textAndUrls: !curr.entities.media && curr.entities.urls.length > 0 ? el.textAndUrls + 1 : el.textAndUrls,
        textAndMedia: curr.entities.media && curr.entities.urls.length === 0 ? el.textAndMedia + 1 : el.textAndMedia,
        textUrlsAndMedia: curr.entities.media && curr.entities.urls.length > 0 ? el.textUrlsAndMedia + 1 : el.textUrlsAndMedia,
        tweets: el.tweets + 1 } : el)
    }, getArrayOfDatesBetween(tweets.tweets[tweets.tweets.length - 1].created_at, tweets.tweets[0].created_at))
  : [];

  function getArrayOfDatesBetween(startDate, endDate) {
    let dates = [];
    
    let currDate = moment(new Date(startDate)).startOf(tweetsTimeChart === 'DAYS' ? 'day' : 'month');
    let lastDate = moment(new Date(endDate)).startOf(tweetsTimeChart === 'DAYS' ? 'day' : 'month');

    while(currDate.add(1, tweetsTimeChart === 'DAYS' ? 'days' : 'months').diff(lastDate) <= 0) {
      dates.push({
        name: currDate.format(tweetsTimeChart === 'DAYS' ? 'DD-MM-YY' : 'MM-YY'),
        tweets: 0,
        onlyText: 0,
        textAndUrls: 0,
        textAndMedia: 0,
        textUrlsAndMedia: 0
      });
    }
    
    return dates.reverse()
  }

  const tweetsReplies = tweets.tweets ? tweets.tweets.filter((el) => el.replies)
    .reduce((acc, curr) => {
      return [...acc, curr.replies.reduce((acc, curr) => ({
        ...acc,
        score: curr.sentiment_score.score + acc.score,
        positive: curr.sentiment_score.score > 0 ? acc.positive + 1 : acc.positive,
        negative: curr.sentiment_score.score < 0 ? acc.negative + 1 : acc.negative,
        neutral: curr.sentiment_score.score === 0 ? acc.neutral + 1 : acc.neutral
        }), {score: 0, positive: 0, negative: 0, neutral: 0, numTweet: curr.id})];
    }, []) : [];


  const itemsReplies = [
    {
      key: 'repl',
      title: 'Total Replies',
      value: tweets.repliesTotal || 0,
      icon:  'fas fa-reply'
    },
    {
      key: 'average',
      title: 'Average Replies',
      value: tweetsReplies.length > 0 ? (tweets.repliesTotal / tweetsReplies.length).toFixed(2) : 0
    },
    {
      key: 'reptwe',
      title: 'Tweet+Replies',
      value: tweetsReplies.length
    },
    {
      key: 'pos',
      title: 'Positives',
      value: tweetsReplies.reduce((acc, curr) => curr.positive + acc, 0),
      icon:  'fas fa-thumbs-up'
    },
    {
      key: 'neg',
      title: 'Negatives',
      value: tweetsReplies.reduce((acc, curr) => curr.negative + acc, 0),
      icon:  'fas fa-thumbs-down'
    },
    {
      key: 'neu',
      title: 'Neutral',
      value: tweetsReplies.reduce((acc, curr) => curr.neutral + acc, 0),
      icon:  'fas fa-meh'
    },
    {
      key: 'scpos',
      title: 'Tw Score Positive',
      value: tweetsReplies.filter(el => el.score > 0).length
    },
    {
      key: 'neu',
      title: 'Tw Score Neutral',
      value: tweetsReplies.filter(el => el.score === 0).length
    },
    {
      key: 'neu',
      title: 'Tw Score Negative',
      value: tweetsReplies.filter(el => el.score < 0).length
    },
  ]

  function handleMentions(mention) {
    setModalData(tweets.tweets.filter((el) => 
      el.entities.user_mentions.some(obj =>
          obj.screen_name === mention.value)
      ));

    setShowModal(true);
  }

  function handleHashtags(hashtag) {
    setModalData(tweets.tweets.filter((el) => 
      el.entities.hashtags.some(obj =>
        obj.text === hashtag.value)
    ));

    setShowModal(true);
  }

  return (
    <div className="tfg-tweets-analitycs">
      <Card content={
        <div className="tfg-tweets-analitycs__main">
          <div className="tfg-tweets-analitycs__info-state">
            { `Status of tweets: ${ tweets.state ? tweets.state : 'Loading...' }` }
            <i onClick={ refreshTweetsData } className="fas fa-sync-alt" />
          </div>
          <div>
            <span>Analysis from <strong>{tweets.dateInit && tweets.dateEnd ? moment(new Date(tweets.dateInit)).format('Do MMM YY')
            + " to " +  moment(new Date(tweets.dateEnd)).format('Do MMM YY') : "Loading" }</strong></span> 
          </div>
          <div>
            Replies only can be retrieve of the 7 days before of search
          </div>
        </div>
      }/>

      {
        tweets.tweets && <LabelledValueList items={ items } />   
      }

      {tweets.tweets && (
        <Card title="Users Mentions" content={ <TagCloud
          minSize={12}
          maxSize={35}
          tags={ tweets.userMentionsGrouped }
          onClick={ handleMentions }
      /> } />) }

      {tweets.tweets && (
        <Card title="Hashtags" content={ <TagCloud
          minSize={12}
          maxSize={35}
          tags={ tweets.hashtagsGrouped }
          onClick={ handleHashtags }
      /> } />) }

      
      <Card title="Tweets in the time"
          content={ (
            <div ref={targetRef}>
              <div className="tfg-tweets-analitycs__chart-buttons">
                <div className="btn-group btn-group-toggle">
                  <label style={{ zIndex: 0 }}
                      className={ `btn btn-secondary ${ tweetsTimeChart === 'DAYS' ? 'active' : '' }` }
                      onClick={ () => setTweetsTimeChart('DAYS') }>
                    <input type="radio" checked  onChange={() => {}}/> Days
                  </label>
                  <label style={{ zIndex: 0 }}
                      className={ `btn btn-secondary ${ tweetsTimeChart === 'MONTHS' ? 'active' : '' }` }
                      onClick={ () => setTweetsTimeChart('MONTHS') }>
                    <input type="radio" name="options" id="option2" onChange={() => {}}/> Months
                  </label>
                </div>
                <div className="btn-group btn-group-toggle">
                  <label style={{ zIndex: 0 }}
                      className={ `btn btn-secondary ${ tweetsTypeChart === 'LINE' ? 'active' : '' }` }
                      onClick={ () => setTweetsTypeChart('LINE') }>
                    <input type="radio" checked onChange={() => {}}/> Line
                  </label>
                  <label style={{ zIndex: 0 }}
                      className={ `btn btn-secondary ${ tweetsTypeChart === 'BAR' ? 'active' : '' }` }
                      onClick={ () => setTweetsTypeChart('BAR') }>
                    <input type="radio" name="options" id="option2" onChange={() => {}}/> Bar
                  </label>
                </div>
              </div>
              {
                tweetsTypeChart === 'LINE' ? (
                  <LineChart 
                    width={ widthOfCharts } height={400} data={newTweetsPerDay} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="tweets" stroke="#8884d8" />
                    <Line type="monotone" dataKey="onlyText" stroke="#00FF00" />
                    <Line type="monotone" dataKey="textAndUrls" stroke="#ff0000" />
                    <Line type="monotone" dataKey="textAndMedia" stroke="#ff00ff" />
                    <Line type="monotone" dataKey="textUrlsAndMedia" stroke="#00ffff" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                  </LineChart>
                ) : (
                  <BarChart
                      width={ widthOfCharts }
                      height={400}
                      data={ newTweetsPerDay }
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tweets" fill="#8884d8" />
                      <Bar dataKey="onlyText" fill="#00FF00" />
                      <Bar dataKey="textAndUrls" fill="#ff0000" />
                      <Bar dataKey="textAndMedia" fill="#ff00ff" />
                      <Bar dataKey="textUrlsAndMedia" fill="#00ffff" />
                    </BarChart>
                )
              } 
          </div>) }/>

      <Card title="Info replies" />
      
      <Card title={ 'Sentiment in replies' }
          content={(
            <BarChart
                width={widthOfCharts}
                height={400}
                data={tweetsReplies}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="numTweet" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#00008b" />
                <Bar dataKey="positive" stackId="a" fill="#00FF00" />
                <Bar dataKey="negative" stackId="a" fill="#ff0000" />
                <Bar dataKey="neutral" stackId="a" fill="#d3d3d3" />
              </BarChart>
          )} />

      { tweets.tweets && <LabelledValueList items={ itemsReplies } /> }
      <ReactModal 
          isOpen={ showModal }
          contentLabel="Minimal Modal Example"
        >
          <div className="tfg-modal">
            <div className="tfg-modal__heading">
              <h3>Tweets Result</h3>
              <i className="fas fa-times" onClick={() => setShowModal(false)} />
            </div>
            <ul className="tfg-tweets">
              { modalData.map((el, index) => (
                  <li className="tfg-tweets__tweet" key={index}>
                    <span>{ el.text }</span> <i className="fas fa-share" onClick={() => {
                      window.open(
                        `https://www.twitter.com/${ el.user_screen_name }/status/${ el.id_str }`,
                        '_blank' // <- This is what makes it open in a new window.
                      );
                    }}/>
                  </li>
              ))}
            </ul>
          </div>
        </ReactModal>
    </div>
  )
}