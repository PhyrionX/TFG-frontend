import React from 'react'

export default function Input({type, value, id, error, onChange, placeholder, label}) {
  return (
    <div className="form-group">
      { label && <label htmlFor={ id }>{ label }</label> }
      <input type={ type }
          value={ value }
          className={ `form-control ${ error ? 'is-invalid' : '' }` }
          placeholder={ placeholder }
          id={ id }
          onChange={ onChange } />
    </div>
  )
}