/* eslint-disable prettier/prettier */
import {
  CTable,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const VendorTable = () => {
  const [vehicles, setVehicles] = React.useState([])

  const fetchData = async() => {
    await axios.get("http://localhost:5000/api/vehicle")
    .then(res=>{
      setVehicles(res.data.vehicles);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchData()
  },[]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/vehicle/delete/${id}`)
      .then((res) => {
        toast.success("Vehicle deleted successfuly")
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Vehicle</strong> <small>details</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Vehicle Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Vehicle Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price (per day)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vehicles && vehicles.map((vehicle)=><CTableRow key={vehicle?.id}>
                  <CTableDataCell >
                    <img style={{width: "100px"}} src={vehicle.displayImage}/>
                  </CTableDataCell>
                  <CTableDataCell>{vehicle.vehicleNumber}</CTableDataCell>
                  <CTableDataCell>{vehicle.vehicleModal}</CTableDataCell>
                  <CTableDataCell>Rs. {vehicle.perDayPrice}</CTableDataCell>
                  <CTableDataCell style={{ gap: '10px', display: 'flex' }}>
                    {/* <button className="btn btn-info">Edit</button> */}
                    <button onClick={()=>handleDelete(vehicle?._id)} className="btn btn-danger">Delete</button>
                  </CTableDataCell>
                </CTableRow>)}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VendorTable
