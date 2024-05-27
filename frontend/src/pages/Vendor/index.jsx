import React, { useState } from 'react'
import "./vendor.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom"

const Vendor = () => {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [citizenship, setCitizenship] = useState();
  const [pan, setPan] = useState();

  const handleOnSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(item=>{
      formData.append(item, data[item]);
    })

    if(citizenship && pan){
      formData.append("pan", pan);
      formData.append("citizenship", citizenship);
    }

    axios.post("http://localhost:5000/api/vendor/signup", formData)
    .then(()=>{
      toast({
        title: 'Account creation successful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      navigate("/")
    })
    .error(()=>{
      toast({
        title: "something went wrong",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    })
  }

  return (
    <div className='vendor__container'>
      <div className='signup__card'>
        <div className="signup__card__title">Join us as vendor</div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="form">
          <label htmlFor="company-name">Company Name</label>
          <input {...register("company_name", { required: true })} name='company_name' type="text" className="input" />
          <label htmlFor="email">Email Address</label>
          <input {...register("email", { required: true })} name='email' type="email" className='input' />
          <label htmlFor="contact">Contact Number</label>
          <input {...register("contact_number", {required: true})} name='contact_number' type="tel" className='input' />
          <label htmlFor="password">Password</label>
          <input {...register("password", { required: true})} name='password' type="password" className='input' />
          <label htmlFor="owner-name">Company Owner Name</label>
          <input {...register("owner_name", {required: true})} type="text" className='input' />
          <label htmlFor="citizenship">Citizenship</label>
          <input onChange={e=>setCitizenship(e.target.files[0])} type="file" className='input' />
          <label htmlFor="pan">PAN</label>
          <input onChange={e=>setPan(e.target.files[0])} type="file" className='input' />
          <label htmlFor="address">Address</label>
          <input {...register("address", { required: true})} type="text" className='input' />
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Vendor