
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SoundTherapyPage from "./pages/SoundTherapyPage";
import GamesPage from "./pages/GamesPage";
import ResourcesPage from "./pages/ResourcesPage";
import Profile from "./pages/Profile";
import Sessions from "./pages/Sessions";
import NotFound from "./pages/NotFound";

// Create a client for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sounds" element={<SoundTherapyPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sessions" element={<Sessions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
