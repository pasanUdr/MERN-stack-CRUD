import React from 'react'
import "../App.css"
import { FaWindowClose } from "react-icons/fa";

const FormTable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="closeBtn" onClick={handleClose}>
                <FaWindowClose/>
              </div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

              <label htmlFor="mobile">Mobile:</label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>

              <button className="btn">SUBMIT</button>
            </form>
          </div>
  )
}

export default FormTable