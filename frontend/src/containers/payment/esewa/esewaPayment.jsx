const path = "https://uat.esewa.com.np/epay/main";


const EsewaPayment = ({amount,taxAmount,pid}) => {
  const params = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: taxAmount,
    tAmt: amount + taxAmount,
    pid: pid,
    scd: "EPAYTEST",
    su: "http://localhost:3000/esewa_payment_success",
    fu: "http://localhost:3000/esewa_payment_failed",
  };
  const handleEsewaPayment = () => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };
  return handleEsewaPayment;
};

export default EsewaPayment;
