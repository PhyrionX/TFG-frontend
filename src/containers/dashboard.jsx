import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';

export default function Dashboard() {
  const idUser = useSelector(state => state.auth.email)

  useEffect(() => {
    getAuth(idUser)
      .then(({ data }) => console.log(data));
  }, []);

  
  return <h1>Dashboard</h1>
}