import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../services/authentication';
import Card from '../components/card/input';

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
    <Card title="Text title" content={ (
      <React.Fragment>
        <form method="post"action="http://localhost:8081/auth/twitter">
          <input type="hidden" name="user" value={ user } />
          <button type="submit" className="btn btn-primary pull-right" >Login with Twitter</button>
        </form>
        <br />
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Id Twitter</th>
            <th scope="col">Screen Name</th>
            <th scope="col">Information</th>
          </tr>
        </thead>
        <tbody>
          { cuentas.map((cuenta, index) => (
            <tr key={ index }>
              <td>{ cuenta.id_twitter }</td>
              <td>{ cuenta.cuenta }</td>
              <td>{ cuenta.info }</td>
            </tr>
          )) }
        </tbody>
      </table>
      </React.Fragment>
    ) } />
  </div>
}