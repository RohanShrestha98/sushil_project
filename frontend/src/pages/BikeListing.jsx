import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";

const BikeListing = () => {
  const [bikeData,  setBikeData] = React.useState(null)
  
  const fetchData  = async () =>{
    await axios.get("http://localhost:5000/api/vehicle")
    .then(res=>{
      setBikeData(res.data.vehicles)
    }).catch(err=>[
      console.log(err)
    ])
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Helmet title="Bikes">
      <CommonSection title="Bikes Listing" />

      <section>
        <Container>
          <Row>
            {/* <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col> */}

            {bikeData && bikeData.filter(car=>car.category === "BIKE").filter(bike=>bike.available===true).map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
            {
              !bikeData && <div>No cars found</div>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeListing;
