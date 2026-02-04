// import { ComponentExample } from "@/components/component-example";
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "@/components/app/home/HomePage";
import { RoutePage } from "@/components/app/route-bus/RoutePage";
import { PaymentPage } from "@/components/app/payment/PaymentPage";
import { useAppSelector } from "./hooks/reduxHooks";
import { use, useEffect } from "react";

export function App() {
  const navigate = useNavigate();
  const {auth: {exists}} = useAppSelector((s) => s);

  console.log(exists)
  
  // useEffect(() => { 
  //   if(exists){
  //     navigate('/route')
  //   }else{
  //     navigate('/')
  //   }
  // }, [exists]);
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="route" element={<RoutePage />} />
      <Route path="payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
