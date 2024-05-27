import React, { useRef, useContext, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import YATRA from "../../assets/all-images/YATRA.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, useDisclosure, VStack, useToast } from "@chakra-ui/react";
import { Login } from "../../pages/Login";
import { Signup } from "../../pages/Signup";
import AuthContext from "../contexts/authContext";
import { GoBell } from "react-icons/go";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button
} from '@chakra-ui/react'
import axios from "axios"


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/bikes",
    display: "Bikes",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];


const Header = () => {
  const menuRef = useRef(null);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const btnRef = React.useRef()
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false)
  const { isLoggedIn, getPhoneNumber, logout } = useContext(AuthContext);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const [buttonPopup, setButtonPopup] = useState(false);
  const toast = useToast();


  const { onClose, onOpen, isOpen } = useDisclosure();
  const { onClose: onSignupClose, onOpen: onSignupOpen, isOpen: isSignupOpen } = useDisclosure();

  const fetchBookingData = async () => {
    const contact = localStorage.getItem("phoneNumber")
    await axios.get(`http://localhost:5000/api/user/bookings/${contact}`)
      .then((res) => {
        setBookingData(res.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchBookingData();
  }, [getPhoneNumber])



  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +9771234567
                </span>
              </div>
            </Col>
            {isLoggedIn() ? <Col lg="6" md="6" sm="6">
              <div className="header__top__right relative d-flex align-items-center justify-content-end gap-3">
                <div onClick={() => setLogoutModal(!logoutModal)} style={{ cursor: "pointer" }} className=" d-flex align-items-center gap-1 ">
                  <i className="ri-user-line"></i> Profile
                </div>
                {
                  logoutModal && <div onClick={() => {
                    logout();
                    toast({
                      title: 'Logout successful.',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                      position: 'top-right'
                    })
                    navigate("/home");
                  }} className="absolute w-[140px] py-2 cursor-pointer 00 px-4  top-8 border bg-white z-10 text-gray-800 hover:bg-gray-1">Logout</div>
                }
                <div ref={btnRef} onClick={onDrawerOpen} style={{ cursor: "pointer" }} className=" d-flex align-items-center gap-1">
                  <GoBell />
                </div>
              </div>
            </Col>
              :
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <div style={{ cursor: "pointer" }} onClick={onOpen} className=" d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Login
                  </div>
                  <div style={{ cursor: "pointer" }} onClick={onSignupOpen} className=" d-flex align-items-center gap-1">
                    <i className="ri-user-line"></i> Register
                  </div>
                </div>
              </Col>}
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg="3" md="3" sm="4">
              <div className="logo">
                <Link style={{
                  flexDirection: "column",
                  textDecoration: "none",
                }} to="/home" className="d-flex align-items-center gap-2">
                  <img src={YATRA} alt="" style={{ height: '100px', borderRadius: '10px', width: '100px' }} />
                  <span style={{
                    fontSize: "10px",
                  }}>
                    YATRA: More Than a Ride, It's an Experience
                  </span>
                </Link>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Nepal</h4>
                  <h6>Kathmandu, Nepal</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>9am - 7pm</h6>
                </div>
              </div>
            </Col>
            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request support
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div> */}
          </div>
        </Container>
      </div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Login onSignupOpen={onSignupOpen} onLoginClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        onClose={onSignupClose}
        isOpen={isSignupOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Signup onLoginOpen={onOpen} onSignupClose={onSignupClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isDrawerOpen}
        placement='right'
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Booking History</DrawerHeader>

          <DrawerBody>
            <VStack>
              {
                bookingData.map((item) => {
                  return (<div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: "10px", width: "100%" }} key={item._id}>
                    <img style={{ height: "100px", objectFit: "contain", overflow: "hidden", width: "auto" }} src={item?.vehicle?.displayImage} alt="" />
                    <div style={{
                      fontSize: "14px"
                    }}>
                      <div style={{
                        fontSize: "18px"
                      }}>{item?.vehicle?.vehicleNumber}</div>
                      <div>{item?.date}</div>
                      <div>{item?.duration} Days</div>
                      <div>Rs.{parseInt(item?.duration) * parseInt(item?.vehicle?.perDayPrice)}</div>
                    </div>
                  </div>)
                })
              }
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
