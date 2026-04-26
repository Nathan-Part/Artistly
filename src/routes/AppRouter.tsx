import { Routes, Route } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ArtistDetailPage from "../pages/ArtistDetailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/artist/:id" element={<ArtistDetailPage />} />
    </Routes>
  );
}

export default AppRouter;