import React, { useRef, useLayoutEffect, useState } from 'react';
import moment from 'moment';
import ReactModal from 'react-modal';
import { TagCloud } from 'react-tagcloud';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
import Card from '../card/Card';
import './tweets-analitycs.scss';
import LabelledValueList from '../commons/labelled-value-list';
import { getTweetsByMention, getTweetsByHashtag } from '../../services/twitterService';

export default function TweetsAnalitycs({ analitycInfo, refreshTweetsData, itemsGeneral, itemsReplies, infoTotals, compare }) {
  const [widthOfCharts, setWidthOfCharts ] = useState(0);
  const [tweetsTimeChart, setTweetsTimeChart ] = useState('DAYS');
  const [tweetsTypeChart, setTweetsTypeChart ] = useState('LINE');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

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
  
  useLayoutEffect(() => {
    test_dimensions();
  }, [compare]);

  // every time the window is resized, the timer is cleared and set again
  // the net effect is the component will only reset after the window size
  // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // redrawing of the component for more complex components such as charts
  window.addEventListener("resize", () => {
    clearInterval(movement_timer);
    movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
  });
  
  function handleMentions(mention) {
    console.log(mention, analitycInfo.id_of_analityc);
    
    getTweetsByMention(analitycInfo.id_of_analityc, mention.value)
      .then(({data}) => {
        setModalData(data);
        setShowModal(true);
      })
      .catch((err) => console.log(err))
  }

  function handleHashtags(hashtag) {
    getTweetsByHashtag(analitycInfo.id_of_analityc, hashtag.value)
    .then(({data}) => {
      setModalData(data);
      setShowModal(true);
    })
    .catch((err) => console.log(err))
  }


  return (
    <div className="tfg-tweets-analitycs">
      <Card content={
        <div className="tfg-tweets-analitycs__main">
          <div className="tfg-tweets-analitycs__info-state">
            { `Status of tweets: ${ analitycInfo.state ? analitycInfo.state : 'Loading...' }` }
            <div>
              <a href={ `http://localhost:8081/${ analitycInfo.id_of_analityc }.txt` } target="blank">Generate metrics file</a>&nbsp;&nbsp;&nbsp;<i onClick={ refreshTweetsData } className="fas fa-sync-alt" />
            </div>
          </div>
          <div>
            <span>Analysis from <strong>{analitycInfo.dateInit && analitycInfo.dateEnd ? moment(new Date(analitycInfo.dateInit)).format('Do MMM YY')
            + " to " +  moment(new Date(analitycInfo.dateEnd)).format('Do MMM YY') : "Loading" }</strong></span> 
          </div>
          {/* <div>
            Replies only can be retrieve of the 7 days before of search
          </div> */}
        </div>
      }/>

      {
        analitycInfo.state && analitycInfo.state === 'Done' && (
          <React.Fragment>
            <LabelledValueList items={ itemsGeneral } />

            <Card title="Users Mentions" content={ <TagCloud
                minSize={12}
                maxSize={35}
                tags={ analitycInfo.userMentionsGrouped }
                onClick={ handleMentions } /> } />
            
            <Card title="Hashtags" content={ <TagCloud
                minSize={12}
                maxSize={35}
                tags={ analitycInfo.hashtagsGrouped }
                onClick={ handleHashtags } /> } />
          </React.Fragment>
        )
      }

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
                    width={ widthOfCharts } height={400} data={ analitycInfo.state && analitycInfo.state === 'Done' ? tweetsTimeChart === 'DAYS' ? analitycInfo.postsInDay : analitycInfo.postsInMonth : [] } margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="tweets" stroke="#8884d8" />
                    <Line type="monotone" dataKey="onlyText" stroke="#00FF00" />
                    <Line type="monotone" dataKey="onlyImage" stroke="#ff0000" />
                    <Line type="monotone" dataKey="textAndImage" stroke="#ff00ff" />
                    <Line type="monotone" dataKey="textAndImageAndUrl" stroke="#00ffff" />
                    <Line type="monotone" dataKey="onlyVideo" stroke="#FFAAFF" />
                    <Line type="monotone" dataKey="textAndVideo" stroke="#120012" />
                    <Line type="monotone" dataKey="textAndVideoAndUrl" stroke="#AA00ff" />
                    <Line type="monotone" dataKey="textAndUrls" stroke="#00AAAA" />
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
                      data={ analitycInfo.state && analitycInfo.state === 'Done' ? tweetsTimeChart === 'DAYS' ? analitycInfo.postsInDay : analitycInfo.postsInMonth : [] }
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Legend />
                      <Tooltip />
                      <Bar dataKey="tweets" fill="#8884d8" />
                      <Bar dataKey="onlyText" fill="#00FF00" />
                      <Bar dataKey="onlyImage" fill="#ff0000" />
                      <Bar dataKey="textAndImage" fill="#ff00ff" />
                      <Bar dataKey="textAndImageAndUrl" fill="#00ffff" />
                      <Bar dataKey="onlyVideo" fill="#FFAAFF" />
                      <Bar dataKey="textAndVideo" fill="#120012" />
                      <Bar dataKey="textAndVideoAndUrl" fill="#AA00ff" />
                      <Bar dataKey="textAndUrls" fill="#00AAAA" />
                    </BarChart>
                )
              } 
          </div>) }/>

          <LabelledValueList items={ infoTotals } />

          <Card title="Favorites and retweetsaa"
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
                    width={ widthOfCharts } height={400} data={ analitycInfo.state && (analitycInfo.state === 'Done' ? tweetsTimeChart === 'DAYS' ? analitycInfo.postsInDay : analitycInfo.postsInMonth : []).map((el) => ({
                      ...el,
                      averageFavorites: el.tweets ? el.favorites / el.tweets : 0,
                      averageRetweets: el.tweets ? el.retweets / el.tweets : 0
                    })) } margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="favorites" stroke="#8884d8" />
                    <Line type="monotone" dataKey="retweets" stroke="#00FF00" />
                    <Line type="monotone" dataKey="averageFavorites" stroke="#ff0000" />
                    <Line type="monotone" dataKey="averageRetweets" stroke="#00ffff" />
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
                      data={ analitycInfo.state && (analitycInfo.state === 'Done' ? tweetsTimeChart === 'DAYS' ? analitycInfo.postsInDay : analitycInfo.postsInMonth : []).map((el) => ({
                        ...el,
                        averageFavorites: el.tweets ? el.favorites / el.tweets : 0,
                        averageRetweets: el.tweets ? el.retweets / el.tweets : 0
                      })) }
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Legend />
                      <Tooltip />
                      <Bar dataKey="favorites" fill="#8884d8" />
                      <Bar dataKey="retweets" fill="#00FF00" />
                      <Bar dataKey="averageFavorites" fill="#ff0000" />
                      <Bar dataKey="averageRetweets" fill="#00ffff" />
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
                data={analitycInfo.replies || []}
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

      { analitycInfo.state && analitycInfo.state === 'Done' && <LabelledValueList items={ itemsReplies } /> }
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