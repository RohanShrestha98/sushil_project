import React, { useContext } from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/car-item.css";
import { useToast } from "@chakra-ui/react";
import AuthContext from "../contexts/authContext";

const CarItem = (props) => {
  const toast = useToast();
  const { getUsername } = useContext(AuthContext);

  const { _id, displayImage: imgUrl, vehicleModal: model, vehicleNumber: carName, perDayPrice: price } = props.item;
  const navigate = useNavigate();


  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            Rs {price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {model}
            </span>
            {/* <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {speed}
            </span> */}
          </div>

          <button onClick={() => {
            !getUsername()? toast({ description: "you need to login" })
            :navigate(`/cars/${_id}`,{state:props?.item});
          }} className="w-50 car__item-btn car__btn-rent">
            <div>Rent</div>
          </button>

          <button onClick={() => {
            !getUsername()? toast({ description: "you need to login" })
            :navigate(`/cars/${_id}`,{state:props?.item})
          }} className=" w-50 car__item-btn car__btn-details">
            <div>Details</div>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
