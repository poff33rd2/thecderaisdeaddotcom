'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import './login.css';

export default function AuthPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0); // 0: welcome, 1: login, 2: signup

    useEffect(() => {
        // Check if we should start on signup page
        const signup = searchParams.get('signup');
        if (signup === 'true') {
            setCurrentPage(2);
        }
    }, [searchParams]);

    if (!loading && user) {
        router.push('/dashboard');
        return null;
    }

    return (
        <main className="auth-scroll-container">
            <div className="auth-scroll-wrapper" style={{ transform: `translateX(-${currentPage * 33.333}%)` }}>
                {/* Welcome Screen */}
                <section className="auth-screen">
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

