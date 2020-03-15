import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/Card';
import Table from '../components/commons/table';

export default function Configuration() {
  const user = useSelector(state => state.auth.email);
  const [cuentas, setCuentas] = useState([])
 
  useEffect(() => {
    getAuth()
      .then(({ data }) => {
        setCuentas(data.user.cuentas)
      });
  }, []);

  return <div className="page-configuration">
    <Card title="Configuration" content={ (
      <React.Fragment>
        <form method="post"action="http://localhost:8081/auth/twitter">
          <input type="hidden" name="user" value={ user } />
          <button type="submit" className="btn btn-primary pull-right" >Login with Twitter test</button>
        </form>
        <br />
        <Table columns={
            [
              {
                key: 'id_twitter',
                label: 'Id Twitter'
              },
              {
                key: 'cuenta',
                label: 'Screen Name'
              },
              {
                key: 'info',
                label: 'Information'
              }
            ]
          }
          data={ cuentas } />
      </React.Fragment>
    ) } />
  </div>
}