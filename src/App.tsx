// import { ComponentExample } from "@/components/component-example";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/app/home/HomePage";
import { RoutePage } from "@/components/app/route-bus/RoutePage";

export function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="route" element={<RoutePage />} />
      <Route path="payment" element={<HomePage />} />
    </Routes>
  );
}

export default App;
