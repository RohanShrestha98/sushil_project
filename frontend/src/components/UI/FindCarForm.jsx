import React, { useEffect } from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import axios from "axios";
import { Form, FormGroup } from "reactstrap";
import CarItem from "./CarItem";
import { useForm } from 'react-hook-form'

const FindCarForm = () => {
  const [vehiclesSearchResults, setVehiclesSearchResults] = React.useState(null);
  const { register, handleSubmit, errors, setValue } = useForm(); // coming from the hook

  const onSubmit = async (data) => {
    await axios.get(`http://localhost:5000/api/vehicle/search/${data.category}/${data.max_budget}`)
      .then(res => {
        setVehiclesSearchResults(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          {/* <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup> */}

          {/* <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup> */}

          {/* <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup> */}

          {/* <FormGroup className="form__group">
          <input
          className="journey__time"
          type="time"
          placeholder="Journey time"
          required
          />
          
        </FormGroup> */}
          <FormGroup className="select__group">
            <select {...register("category")} placeholder="select vehicle category">
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
            </select>
          </FormGroup>
          <FormGroup className="select__group">
            <input
              {...register("max_budget")}
              className="budget__input"
              required
              placeholder="Input your maximum budget"
              type="number"
            />
          </FormGroup>

          <FormGroup className="form__group">
            <button type="submit" className="btn find__car-btn">Search </button>
          </FormGroup>
        </div>
      </Form>
      {
        vehiclesSearchResults && <>
          {
            vehiclesSearchResults.length === 0 ?
              <div>No vehicle found for this criteria.</div> :
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center"
              }}>
                <div style={{
                  display: "flex",
                  overflowY: "scroll"
                }}>
                  {
                    vehiclesSearchResults.map(vehicle => {
                      return (
                        <CarItem item={vehicle} key={vehicle._id} />
                      )
                    })
                  }
                </div>
                <button style={{
                  backgroundColor: "blue",
                  marginBottom: "40px",
                  width: "20%",
                  color:"white"
                }} className="btn" onClick={()=>setVehiclesSearchResults(null)}>Clear Search</button>
              </div>
          }
        </>
      }
    </>
  );
};

export default FindCarForm;
