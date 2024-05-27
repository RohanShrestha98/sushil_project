import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import AuthContext from "../components/contexts/authContext";

import "../styles/vehicle-rent-form.css"
import EsewaPayment from '../containers/payment/esewa/esewaPayment';
import { useNavigate } from 'react-router-dom';

const VehicleRentForm = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { isLoggedIn, getPhoneNumber, getUsername, getEmail } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    vehicleNumber: location?.state?.vehicleNumber,
    date: "",
    address: "",
    email: "",
    duration: 0
  });

  const handleRent = async () => {
    if (!isLoggedIn()) {
      alert("the user must be logged in to rent a vehicle")
    }
    await axios.post('http://localhost:5000/api/request/create', { ...formData,vendor:location?.state?.vendor, userContact: getPhoneNumber(), email: getEmail(), username: getUsername() })
      .then(_res => {
        alert("Your request was sent. Please check your email to verify.")
        navigate("/")
      })
      .catch(_err => {
        console.log(_err)
      })
  }
  const [pid, _] = useState(new Date() * Math.random(0, 100))
  const handleEsewaPayment = EsewaPayment({ amount: formData.duration * location?.state?.perDayPrice, taxAmount: 12, pid: pid });


  return (
    <div className='grid grid-cols-2 gap-16 mx-24 my-10 '>
      <div className=' w-full '>
        <div className=" font-semibold text-2xl">Vehicle Details</div>
          <img src={location?.state?.displayImage} className='w-full object-cover ' alt="" />
          <div className="desc-container">
            <div className='name'>Name: {location?.state?.vehicleNumber}</div>
            <div className='price'>Per Day Price : Rs.{location?.state?.perDayPrice}</div>
        </div>
        <div className='description'>{location?.state?.description}</div>
      </div>
      <div className='w-full border px-4 py-2 rounded-xl flex flex-col gap-2'>
        <div className="font-semibold text-2xl">Renting Form</div>
        <div className='flex flex-col '>
          <label htmlFor="username"> Username</label>
          <input className='input' value={getUsername()} type="text" onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="email"> Email</label>
          <input className='input' value={getEmail()} type="text" onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="contact"> Contact</label>
          <input className='input' type="text" value={getPhoneNumber()} disabled />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="date"> Date</label>
          <input className='input' type="date" onChange={(e) => { setFormData({ ...formData, date: e.target.value }) }} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="address">Address</label>
          <input className='input' type="text" onChange={(e) => { setFormData({ ...formData, address: e.target.value }) }} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="duration"> Duration (In Days)</label>
          <input className='input' type="number" onChange={(e) => { setFormData({ ...formData, duration: e.target.value }) }} />
        </div>
        <div className='flex flex-col '>
          <label htmlFor="finalCost"> Final Cost</label>
          <input className='input' disabled type="text" value={formData.duration * location?.state?.perDayPrice} />
        </div>
        <div style={{display: "flex", flexDirection: "row", gap: "10px", alignContent: "center"}}>
          <input required type='checkbox' />
          <label style={{display: "flex", flexDirection: "row", gap: "8px",  alignItems: "center"}} htmlFor="terms">Agree to our <p style={{
            color: "blue",
            textDecoration: "underline",
            height: "30%",
            cursor: "pointer"
          }}
          onClick={()=>navigate("/terms-condition")}
          >terms and conditions</p>?</label>
        </div>
        {/* <div>
          <label htmlFor="contact"> Pid </label>
          <input className='input' placeholder='Enter your unique pid' type="text" onChange={(e)=>setPID(e.target.value)}/>
        </div> */}
        <div className='grid grid-cols-2 gap-4 mb-4'>
        <button className='text-white bg-blue-500 hover:opacity-70 rounded-md py-2' onClick={() => handleRent()}>Book</button>
        <button className='text-white bg-green-500 hover:opacity-70 rounded-md py-2'
          onClick={() =>
            handleEsewaPayment()
          }>
          Book & Pay with Esewa
        </button>
        </div>
      </div>

    </div>
  )
}

export default VehicleRentForm