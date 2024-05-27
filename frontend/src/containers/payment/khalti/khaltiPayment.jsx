
import { useNavigate } from "react-router-dom";
import axios from "axios";
const clientUrl = "http://localhost:5173/";


const useKhaltiPayment = ({ amount, referralCode = "" }) => {
  const navigate = useNavigate();
  const packageId = 1

  console.log(amount, referralCode, "refffff");

  let khaltiPath =
    import.meta.env.REACT_APP_ENV === "production"
      ? "https://khalti.com/api/v2/epayment/initiate/"
      : "https://a.khalti.com/api/v2/epayment/initiate/";

  const uniqueId = new Date().getTime().toString(36);

  let purchase_order_id = `${packageId}-${amount}-${uniqueId}-${referralCode}`;

  const payload = {
    return_url: `${clientUrl}/${packageId}/khalti/success`,
    website_url: `${clientUrl}/${packageId}/dashboard`,
    amount: amount * 100,
    purchase_order_id,
    purchase_order_name: "3 Months Plan",
  };

  const handleKhaltiPayment = () => {
    axios.post('http://localhost:5000/api/payment/initiate-khalti-pay',  {
      khaltiPath,
      payload,
    })
    .then((res)=>{
      console.log("Payment made successful");
          navigate(res?.data?.payment_url);
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return handleKhaltiPayment;

  //   axios
  //     .post(
  //       `${url}/payment/initiate-khalti-pay`,
  //       {
  //         khaltiPath,
  //         payload,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       window.location.href = res && res.data.payment_url;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Something went wrong! Please try again later!");
  //     });
};

export default useKhaltiPayment;
