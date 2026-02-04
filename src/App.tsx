import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/app/home/HomePage";
import { RoutePage } from "@/components/app/route-bus/RoutePage";
import { PaymentPage } from "@/components/app/payment/PaymentPage";

export function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="route" element={<RoutePage />} />
      <Route path="payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
