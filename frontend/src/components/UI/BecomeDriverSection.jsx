import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";
import { useNavigate } from "react-router-dom";
const BecomeDriverSection = () => {
  const navigate = useNavigate();
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              YATRA : More Than a Ride, It's an Experience
            </h2>
            <button onClick={()=>navigate("/vendor-signup")} className="btn become__driver-btn mt-4">
              Become a Vendor
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
