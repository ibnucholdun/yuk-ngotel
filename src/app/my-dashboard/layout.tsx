import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DashboardSidebar />
      <main className="flex-1 p-8 md:ml-64 pt-44">{children}</main>
    </div>
  );
};

export default DashboardLayout;
