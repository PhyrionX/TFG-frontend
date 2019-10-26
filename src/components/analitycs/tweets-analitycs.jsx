import React from 'react';
import moment from 'moment';
import Card from '../card/Card';
import './tweets-analitycs.scss';

export default function TweetsAnalitycs({ tweets, refreshTweetsData }) {
  console.log(tweets);
  
  return (
    <div className="tfg-tweets-analitycs">
      <Card content={
        <div className="tfg-tweets-analitycs__main">
          <div className="tfg-tweets-analitycs__info-state">
            { `Status of tweets: ${ tweets.state ? tweets.state : 'Loading...' }` }
            <i onClick={ refreshTweetsData } className="fas fa-sync-alt" />
          </div>
          <p>
            <span>Analysis of <strong> {tweets.tweets ? tweets.tweets.length : 'Loading...' } </strong> tweets 
            from <strong>{tweets.dateInit && tweets.dateEnd ? moment(new Date(tweets.dateInit)).format('Do MMM YY')
            + " to " +  moment(new Date(tweets.dateEnd)).format('Do MMM YY') : "Loading" }</strong></span> 
          </p>
        </div>
      }/>
    </div>
  )
}