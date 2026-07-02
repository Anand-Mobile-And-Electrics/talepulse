import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { AuthorPage } from './pages/AuthorPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { TrendingPage } from './pages/TrendingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NewsletterPage } from './pages/NewsletterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreatePost } from './pages/admin/CreatePost';
import { AllPosts } from './pages/admin/AllPosts';

const BackToTop: React.FC = () => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#1E3A8A] hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Main layout wrapper (with navbar and footer)
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
    <BackToTop />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Site Routes */}
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />

        <Route path="/article/:slug" element={
          <MainLayout>
            <ArticlePage />
          </MainLayout>
        } />

        <Route path="/category/:slug" element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        } />

        <Route path="/latest" element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        } />

        <Route path="/trending" element={
          <MainLayout>
            <TrendingPage />
          </MainLayout>
        } />

        <Route path="/breaking" element={
          <MainLayout>
            <TrendingPage />
          </MainLayout>
        } />

        <Route path="/stories" element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        } />

        <Route path="/articles" element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        } />

        <Route path="/editors-pick" element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        } />

        <Route path="/search" element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        } />

        <Route path="/author/:slug" element={
          <MainLayout>
            <AuthorPage />
          </MainLayout>
        } />

        <Route path="/authors" element={
          <MainLayout>
            <AuthorPage />
          </MainLayout>
        } />

        <Route path="/bookmarks" element={
          <MainLayout>
            <BookmarksPage />
          </MainLayout>
        } />

        <Route path="/about" element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        } />

        <Route path="/contact" element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        } />

        <Route path="/privacy" element={
          <MainLayout>
            <PrivacyPage />
          </MainLayout>
        } />

        <Route path="/terms" element={
          <MainLayout>
            <TermsPage />
          </MainLayout>
        } />

        <Route path="/disclaimer" element={
          <MainLayout>
            <TermsPage />
          </MainLayout>
        } />

        <Route path="/newsletter" element={
          <NewsletterPage />
        } />

        <Route path="/tag/:slug" element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        } />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<CreatePost />} />
          <Route path="posts" element={<AllPosts />} />
          <Route path="stories" element={<AllPosts />} />
          <Route path="categories" element={<AdminDashboard />} />
          <Route path="tags" element={<AdminDashboard />} />
          <Route path="authors" element={<AdminDashboard />} />
          <Route path="comments" element={<AdminDashboard />} />
          <Route path="newsletter" element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminDashboard />} />
          <Route path="ads" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
