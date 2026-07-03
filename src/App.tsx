import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* ================= LAYOUT ================= */
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

/* ================= PUBLIC PAGES ================= */
import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import { AuthorPage } from "./pages/AuthorPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { TrendingPage } from "./pages/TrendingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { NewsletterPage } from "./pages/NewsletterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

/* ================= ADMIN ================= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/admin/CreatePost";
import AllPosts from "./pages/admin/AllPosts";
import Categories from "./pages/admin/Categories";
import Tags from "./pages/admin/Tags";
import Authors from "./pages/admin/Authors";
import Comments from "./pages/admin/Comments";
import Newsletter from "./pages/admin/Newsletter";
import Analytics from "./pages/admin/Analytics";
import Ads from "./pages/admin/Ads";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

/* =======================================================
   UTIL COMPONENTS
======================================================= */

/* -------- Scroll To Top -------- */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* -------- Back To Top Button -------- */
const BackToTop: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () =>
      setVisible(window.scrollY > 400);

    window.addEventListener("scroll", toggleVisibility);
    return () =>
      window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#1E3A8A] text-white rounded-full shadow-lg flex items-center justify-center"
    >
      ↑
    </button>
  );
};

/* -------- Public Layout -------- */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

/* =======================================================
   APP
======================================================= */

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/article/:slug"
          element={
            <MainLayout>
              <ArticlePage />
            </MainLayout>
          }
        />

        <Route
          path="/category/:slug"
          element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          }
        />

        <Route
          path="/latest"
          element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          }
        />

        <Route
          path="/trending"
          element={
            <MainLayout>
              <TrendingPage />
            </MainLayout>
          }
        />

        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          }
        />

        <Route
          path="/author/:slug"
          element={
            <MainLayout>
              <AuthorPage />
            </MainLayout>
          }
        />

        <Route
          path="/authors"
          element={
            <MainLayout>
              <AuthorPage />
            </MainLayout>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <MainLayout>
              <BookmarksPage />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        <Route
          path="/privacy"
          element={
            <MainLayout>
              <PrivacyPage />
            </MainLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <MainLayout>
              <TermsPage />
            </MainLayout>
          }
        />

        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<CreatePost />} />
          <Route path="posts" element={<AllPosts />} />
          <Route path="stories" element={<AllPosts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} />
          <Route path="authors" element={<Authors />} />
          <Route path="comments" element={<Comments />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ads" element={<Ads />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;