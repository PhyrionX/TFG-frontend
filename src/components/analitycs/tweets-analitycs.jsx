import React, { useRef, useLayoutEffect, useState } from 'react';
import moment from 'moment';
import { TagCloud } from 'react-tagcloud';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import Card from '../card/Card';
import './tweets-analitycs.scss';
import LabelledValueList from '../commons/labelled-value-list';

export default function TweetsAnalitycs({ tweets, refreshTweetsData }) {
  const [widthOfCharts, setWidthOfCharts ] = useState(0);
  const [tweetsTimeChart, setTweetsTimeChart ] = useState('DAYS');
  const [tweetsTypeChart, setTweetsTypeChart ] = useState('LINE');
  const targetRef = useRef();

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
  

  function getTweetsPerDay () {    
    let newTweetsPerDay = [];

    if (tweets.tweets && tweets.tweets.length > 0) {
      newTweetsPerDay = tweets.tweets.reduce((acc, curr) => {
        const keyName = moment(new Date(curr.created_at)).format(tweetsTimeChart === 'DAYS' ? 'DD-MM-YY' : 'MM-YY');
  
        return acc.map((el) => el.name === keyName ? { ...el, tweets: el.tweets + 1 } : el)
      }, getArrayOfDatesBetween(tweets.tweets[tweets.tweets.length - 1].created_at, tweets.tweets[0].created_at))
    }

    return newTweetsPerDay;
  }

  function getArrayOfDatesBetween(startDate, endDate) {
    let dates = [];
    
    let currDate = moment(new Date(startDate)).startOf(tweetsTimeChart === 'DAYS' ? 'day' : 'month');
    let lastDate = moment(new Date(endDate)).startOf(tweetsTimeChart === 'DAYS' ? 'day' : 'month');

    while(currDate.add(1, tweetsTimeChart === 'DAYS' ? 'days' : 'months').diff(lastDate) <= 0) {
      dates.push({name: currDate.format(tweetsTimeChart === 'DAYS' ? 'DD-MM-YY' : 'MM-YY'), tweets: 0});
    }
    
    return dates.reverse()
  }

  function getRepliesInfo() {
    tweets.tweets && tweets.tweets.filter((el) => el.replies)
      .reduce((acc, curr) => {
        console.log(curr.replies.reduce((acc, curr) => curr.sentiment_score.score + acc, 0));
        
        return acc;
      }, []);
    
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
          onClick={tag => alert(`'${tag.value}' was selected!`)}
      /> } />) }

      {tweets.tweets && (
        <Card title="Hashtags" content={ <TagCloud
          minSize={12}
          maxSize={35}
          tags={ tweets.hashtagsGrouped }
          onClick={tag => alert(`'${tag.value}' was selected!`)}
      /> } />) }

      
      <Card title="Tweets in the time"
          content={ (
            <div ref={targetRef}>
              <div className="tfg-tweets-analitycs__chart-buttons">
                <div class="btn-group btn-group-toggle">
                  <label 
                      class={ `btn btn-secondary ${ tweetsTimeChart === 'DAYS' ? 'active' : '' }` }
                      onClick={ () => setTweetsTimeChart('DAYS') }>
                    <input type="radio" checked /> Days
                  </label>
                  <label class={ `btn btn-secondary ${ tweetsTimeChart === 'MONTHS' ? 'active' : '' }` }
                      onClick={ () => setTweetsTimeChart('MONTHS') }>
                    <input type="radio" name="options" id="option2" autocomplete="off"/> Months
                  </label>
                </div>
                <div class="btn-group btn-group-toggle">
                  <label 
                      class={ `btn btn-secondary ${ tweetsTypeChart === 'LINE' ? 'active' : '' }` }
                      onClick={ () => setTweetsTypeChart('LINE') }>
                    <input type="radio" checked /> Line
                  </label>
                  <label class={ `btn btn-secondary ${ tweetsTypeChart === 'BAR' ? 'active' : '' }` }
                      onClick={ () => setTweetsTypeChart('BAR') }>
                    <input type="radio" name="options" id="option2" autocomplete="off"/> Bar
                  </label>
                </div>
              </div>
              {
                tweetsTypeChart === 'LINE' ? (
                  <LineChart 
                    width={ widthOfCharts } height={400} data={getTweetsPerDay()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="tweets" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                ) : (
                  <BarChart
                  width={ widthOfCharts }
                      height={400}
                      data={ getTweetsPerDay() }
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tweets" fill="#8884d8" />
                    </BarChart>
                )
              }
              
            </div>) }/>

      { console.log(getRepliesInfo()) }
    </div>
  )
}