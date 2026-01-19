'use client';
import { Sidebar } from './Sidebar';
import { MembersInfo } from './MembersInfo';
import './dashboard.css';

export function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <MembersInfo />
      </main>
    </div>
  );
}
