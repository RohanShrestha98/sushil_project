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
} from '@coreui/react';
import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const VendorTable = () => {
  const [vendors, setVendors] = React.useState([]);

  const fetchData = async() => {
     await axios.get("http://localhost:5000/api/vendor")
     .then(res=>{
      setVendors(res.data)
      console.log(res.data)
     })
     .catch(error=>{
      console.log(error)
     })
  }

  React.useEffect(()=>{
    fetchData()
  },[])

  const handleBlock = async (id) => {
    await axios
      .patch(`http://localhost:5000/api/vendor/block/${id}`)
      .then((res) => {
        toast.success("Vendor status change successfuly")
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
            <strong>Vendors</strong> <small>details</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Citizenship</CTableHeaderCell>
                  <CTableHeaderCell scope="col">PAN</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
               {vendors && vendors.map((vendor, index)=><CTableRow>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{vendor.owner_name}</CTableDataCell>
                  <CTableDataCell>{vendor.email}</CTableDataCell>
                  <CTableDataCell>{vendor.contact_number}</CTableDataCell>
                  <CTableDataCell>{vendor.address}</CTableDataCell>
                  <CTableDataCell>
                    <a target={"__blank"} href={vendor.citizenship}>
                      view
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <a target={"__blank"} href={vendor.pan}>
                      view
                    </a>
                  </CTableDataCell>
                  <CTableDataCell style={{ gap: '10px', display: 'flex' }}>
                    <button onClick={()=>handleBlock(vendor?._id)} className="btn btn-danger" style={{width:"90px"}}>{vendor?.status === "block"?"Un block":"Block"}</button>
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
