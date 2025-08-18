import { useEffect, useState } from "react";

export function useSubscribe() {
  const [initialValues, setInitialValues] = useState({
    ownerFullname: "",
    creditCardNum: "",
    expirationDate: "",
    securityCode: "",
    phone: "",
  });
  
  useEffect(() => {
    return () => {
      setInitialValues({
        ownerFullname: "",
        creditCardNum: "",
        expirationDate: "",
        securityCode: "",
        phone: "",
      });
    }
  }, []);

  return {
    initialValues,
    setInitialValues
  };
};