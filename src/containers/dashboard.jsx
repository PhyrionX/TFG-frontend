import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import { getSuggestions, getFiendTimeline } from '../services/twitterService';

export default function Dashboard() {
  const idUser = useSelector(state => state.auth.email)

  useEffect(() => {
    getSuggestions('realmadrid');
    getFiendTimeline('realmadrid');
  },[])
  
  return <h1>Dashboard</h1>
}