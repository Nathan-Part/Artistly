import { Routes, Route, useLocation } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ArtistDetailPage from "../pages/ArtistDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
);
}

export default AppRouter;