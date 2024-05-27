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
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const VendorTable = () => {
  const [vendors, setVendors] = React.useState([])

  const fetchData = async () => {
    await axios
      .get('http://localhost:5000/api/user/get-users')
      .then((res) => {
        setVendors(res.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  React.useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/user/delete/${id}`)
      .then((res) => {
        toast.success("Customer deleted successfuly")
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
            <strong>Customer</strong> <small>details</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendors &&
                  vendors.map((vendor, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{vendor?.username}</CTableDataCell>
                      <CTableDataCell>{vendor?.email}</CTableDataCell>
                      <CTableDataCell>{vendor?.phoneNumber}</CTableDataCell>
                      <CTableDataCell>
                        <button onClick={()=>handleDelete(vendor?._id)} className="btn btn-danger">Delete</button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VendorTable
