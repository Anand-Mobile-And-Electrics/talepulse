import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Public Pages
import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { SearchPage } from "./pages/SearchPage";
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

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/admin/CreatePost";
import AllPosts from "./pages/admin/AllPosts";
import ProtectedRoute from "./components/ProtectedRoute";

/* -------------------- BACK TO TOP -------------------- */
const BackToTop: React.FC = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#1E3A8A] text-white rounded-full shadow-lg flex items-center justify-center"
    >
      ↑
    </button>
  );
};

/* -------------------- SCROLL TO TOP -------------------- */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* -------------------- MAIN LAYOUT -------------------- */
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

/* -------------------- APP -------------------- */
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

        {/* ================= ADMIN ROUTES (PROTECTED) ================= */}

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