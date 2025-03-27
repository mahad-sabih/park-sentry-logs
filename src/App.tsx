
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CarParks from "./pages/CarParks";
import Equipment from "./pages/Equipment";
import FaultReports from "./pages/FaultReports";
import Status from "./pages/Status";
import PartsManagement from "./pages/PartsManagement";
import UserManagement from "./pages/UserManagement";
import SearchPage from "./pages/Search";
import AnalyticsPage from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/car-parks" element={<Layout><CarParks /></Layout>} />
          <Route path="/equipment" element={<Layout><Equipment /></Layout>} />
          <Route path="/faults" element={<Layout><FaultReports /></Layout>} />
          <Route path="/status" element={<Layout><Status /></Layout>} />
          <Route path="/parts" element={<Layout><PartsManagement /></Layout>} />
          <Route path="/users" element={<Layout><UserManagement /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
          <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
