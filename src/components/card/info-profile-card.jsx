import React from 'react';
import './info-profile-card.scss';

export default function InfoProfileCard({ info, onClick }) {
  return (
    <div className={ `tfg-info-profile-card`}
      onClick={ onClick }>
        <div className="tfg-info-profile-card__content">
          <div className="tfg-info-profile-card__image-wrapper">
            <img className="tfg-info-profile-card__image" src={ info.profile_image_url }/>
          </div>
          <div className="tfg-info-profile-card__content-wrapper">
            <div className="tfg-info-profile-card__heading">
              <div>
                <span className="tfg-info-profile-card__heading-name">{ info.name }</span>
              </div>
              <div>
                <span className="tfg-info-profile-card__heading-screen-name">@{ info.screen_name }</span>
              </div>
            </div>
            <div className="tfg-info-profile-card__body">
              { info.description }
            </div>
          </div>
        </div>
        <div className="tfg-info-profile-card__footer">
          <div>
            <span>Followers</span> <strong>{ info.followers_count }</strong>
          </div>
          <div>
            <span>Followings</span> <strong>{ info.friends_count }</strong>
          </div>
          <div>
            <span>Tweets</span> <strong>{ info.statuses_count }</strong>
          </div>
        </div>
    </div>
  )
}