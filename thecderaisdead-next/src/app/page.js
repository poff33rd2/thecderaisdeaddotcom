'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import './home.css';

export default function Home() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0); // 0: welcome, 1: login, 2: signup

  useEffect(() => {
    // Check if we should start on signup page
    const signup = searchParams.get('signup');
    if (signup === 'true') {
      setCurrentPage(2);
    }
  }, [searchParams]);

  return (
    <main className="auth-scroll-container">
      <div className="auth-scroll-wrapper" style={{ transform: `translateX(-${currentPage * 33.333}%)` }}>
        {/* Welcome Screen */}
        <section className="auth-screen">
          <nav className="m-4 absolute top-0">
            <div className="flex flex-col items-center gap-4">
              <img
                src="https://res.cloudinary.com/dtkhwq0je/image/upload/v1765938056/thecderaisdead.com_eqfkoo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
              <p className="text-white text-sm md:text-base">
                Who said hand to hand combat had to stop
              </p>
            </div>
          </nav>

          <div className="welcome-content">
            <h1>Welcome</h1>
            <p>Get started with your account</p>
            <div className="button-group">
              <button 
                className="primary-btn"
                onClick={() => setCurrentPage(2)}
              >
                Create Account
              </button>
              <button 
                className="secondary-btn"
                onClick={() => setCurrentPage(1)}
              >
                Login
              </button>
            </div>
          </div>

          <button className="text-white bg-transparent border-none outline-none appearance-none p-0 m-0 font-inherit hover:underline absolute bottom-6">
            How does it work?
          </button>
        </section>

        {/* Login Screen */}
        <section className="auth-screen">
          <button 
            className="back-btn"
            onClick={() => setCurrentPage(0)}
          >
            ← Back
          </button>
          <LoginForm />
        </section>

        {/* Signup Screen */}
        <section className="auth-screen">
          <button 
            className="back-btn"
            onClick={() => setCurrentPage(0)}
          >
            ← Back
          </button>
          <SignupForm />
        </section>
      </div>

      {/* Page Indicators */}
      <div className="page-indicators">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`indicator ${currentPage === i ? 'active' : ''}`}
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>
    </main>
  );
}