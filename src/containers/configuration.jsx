import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/input';

export default function Configuration() {
  return <div className="page-configuration">
    <Card title="Text title" content={ (
      <form method="get"action="http://localhost:8081/auth/twitter">
        <button type="submit" className="btn btn-primary pull-right" >Login with Twitter</button>
      </form>
    ) } />
  </div>
}