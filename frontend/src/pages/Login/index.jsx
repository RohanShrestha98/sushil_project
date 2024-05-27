import React, { useState, useContext } from 'react'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import AuthContext from '../../components/contexts/authContext';

export const Login = ({ onSignupOpen, onLoginClose }) => {
  const toast = useToast();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandeler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = () => {
    axios.post('http://localhost:5000/api/user/login', formData)
      .then((res) => {
        toast({
          title: 'Login successful.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
        
        login({ token: res.data.token, phoneNumber: res.data.phoneNumber, username: res.data.username, email: res.data.email });

        onLoginClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Invalid email or password",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input onChange={onChangeHandeler} name='email' type="email" value={formData.email} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input onChange={onChangeHandeler} name='password' type="password" value={formData.password} />
      </div>
      <button onClick={onSubmitHandler} className={styles.loginButton}>Login</button>
      <div className={styles.footer}>
        <div>Dont have an account? <span onClick={() => {
          onSignupOpen();
          onLoginClose();
        }}>Register</span></div>
      </div>
    </div>
  )
}
