import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/app/home/HomePage";
import { RoutePage } from "@/components/app/route-bus/RoutePage";
import { PaymentPage } from "@/components/app/payment/PaymentPage";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/reduxHooks";

export function App() {
  const {auth :{exists}} = useAppSelector((s) => s);

  useEffect(()=>{
    if( window.location.pathname === "/payment" || window.location.pathname === "/route"){
      if(!exists){
        window.location.href = "/"
      }
    }
  },[exists])
  
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="route" element={<RoutePage />} />
      <Route path="payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
