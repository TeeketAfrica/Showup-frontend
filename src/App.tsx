import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/app/home/HomePage";
import { RoutePage } from "@/components/app/route-bus/RoutePage";
import { PaymentPage } from "@/components/app/payment/PaymentPage";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/reduxHooks";
import PassangerManifest from "./components/app/passanger/PassangerManifest";
import { ScrollToTop } from "./lib/ScrolltoTop";

export function App() {
  const {auth :{exists}} = useAppSelector((s) => s);

  useEffect(()=>{
    if(window.location.pathname === "/route"){
      if(!exists){
        window.location.href = "/"
      }
    }
  },[exists])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="route" element={<RoutePage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="passanger-manifest/:tripid" element={<PassangerManifest />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>      
    </>

  );
}

export default App;
