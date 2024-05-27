import React, { useState } from 'react'
import styles from './signup.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup.string(),
    password: yup.string()
    // .matches('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/', "invalid password")
  })

export const Signup = ({ onLoginOpen, onSignupClose }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});


  const onSubmitHandler = (data) => {
    axios.post('http://localhost:5000/api/user/signup', data)
      .then(res => {
        toast({
          title: 'Account creation successful.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })

        onSignupClose();
      })
      .catch(err => {
        toast({
          title: "something went wrong",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.container}>
      <h2 className={styles.title}>Signup</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username</label>
        <input {...register("username", { required: "Username is required" })} type="text" />
        <p style={{color: "red"}}>
          {errors && errors?.username?.message}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input {...register("email", { required: "Email is required" })} type="email" />
        <p style={{color: "red"}}>
          {errors && errors?.email?.message}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Phone Number</label>
        <input {...register("phoneNumber", { required: "Phone number is required", max: "phone number must be 10 digits", min:  "phone number must be 10 digits" })} type="text" />
        <p style={{color: "red"}}>
          {errors && errors?.phoneNumber?.message}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input {...register("password", { required: "password is required", min: "password must be minimum 8 characters", max: "password must be at most 15 characters" })} type="password" />
        <p style={{color: "red"}}>
          {errors && errors?.password?.message}
        </p>
      </div>
      <button type='submit' className={styles.loginButton}>Signup</button>
      <div className={styles.footer}>
        <div>Already have an account? <span onClick={() => {
          onLoginOpen();
          onSignupClose();
        }}>Login</span></div>
      </div>
    </form>
  )
}
