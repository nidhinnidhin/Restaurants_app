import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RestaurantsPage from "../pages/RestaurantsPage";
import CreateRestaurantPage from "../pages/CreateRestaurantPage";
import EditRestaurantPage from "../pages/EditRestaurantPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantsPage />} />

        <Route path="/restaurants/new" element={<CreateRestaurantPage />} />

        <Route path="/restaurants/:id/edit" element={<EditRestaurantPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
