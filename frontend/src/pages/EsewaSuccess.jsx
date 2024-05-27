import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function EsewaSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oid = searchParams.get("oid");
  const amt = searchParams.get("amt");
  const refId = searchParams.get("refId");

  const [paymentLog,  setPaymentLog] = React.useState(null)
  
  const paymentLogData = async () =>{
    await axios.get("http://localhost:5000/api/esewa/payment/logs")
    .then(res=>{
      console.log("res",res)
      // setPaymentLog(res.data.vehicles)
    }).catch(err=>[
      console.log(err)
    ])
  }

  useEffect(()=>{
    paymentLogData()
  },[])

  console.log("paymentLog",paymentLog)


  useEffect(() => {
    const verifyEsewaPayment = () => {
      axios
        .post(`http://localhost:5000/api/esewa/add-payment-log`, { oid, amt, refId })
        .then((res) => {
          console.log("res",res );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    console.log(oid, amt, refId);

    if (oid && amt && refId) {
      verifyEsewaPayment();
    }
  }, [oid, amt, refId]);
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <div>Esewa Success</div>
      </div>
    </div>
  )
}
