import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreateBlogForm from './components/CreateBlogForm';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/create" element={<CreateBlogForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
