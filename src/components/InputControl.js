import React from 'react'
import './Inputcontrol.css'
const InputControl = (props) => {
  return (
    <div className='container1'>
        {props.label && <label>{props.label}</label>}
        <input type='text' {...props}/>
      
    </div>
  )
}

export default InputControl
