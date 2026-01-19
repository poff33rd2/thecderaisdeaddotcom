'use client';
import './welcome.css';

export default function Welcome() {
    return (
        <main className="welcome-page">
            <div className="welcome-container">
                <div className="welcome-content">
                    <h1>Hello! 👋</h1>
                    <p>Welcome to the dashboard</p>
                    <a href="/dashboard" className="welcome-link">Go to Dashboard</a>
                </div>
            </div>
        </main>
    );
}
