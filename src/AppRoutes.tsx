import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrdersList } from "./components/OrdersList/OrdersList";

export function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersList />} />
      </Routes>
    </BrowserRouter>
  );
}
