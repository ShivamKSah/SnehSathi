
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RiskAssessment from "./pages/RiskAssessment";
import Nutrition from "./pages/Nutrition";
import Schemes from "./pages/Schemes";
import Resources from "./pages/Resources";
import Articles from "./pages/Articles";
import Community from "./pages/Community";
import Support from "./pages/Support";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NutritionConsultation from "./pages/NutritionConsultation";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import { Toaster } from "./components/ui/toaster";

// ASHA Worker Routes
import AshaLogin from "./pages/AshaLogin";
import AshaDashboard from "./pages/AshaDashboard";
import AshaPatientRegister from "./pages/AshaPatientRegister";
import AshaPatientDetail from "./pages/AshaPatientDetail";
import AshaTrainingResources from "./pages/AshaTrainingResources";
import AshaIncentives from "./pages/AshaIncentives";

function App() {
  return (
    <AppSettingsProvider>
      <TranslationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/nutrition/consultation" element={<NutritionConsultation />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/community" element={<Community />} />
            <Route path="/support" element={<Support />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />

            {/* ASHA Worker Routes */}
            <Route path="/asha-login" element={<AshaLogin />} />
            <Route path="/asha-dashboard" element={<AshaDashboard />} />
            <Route path="/asha-patient-register" element={<AshaPatientRegister />} />
            <Route path="/asha-patient/:patientId" element={<AshaPatientDetail />} />
            <Route path="/asha-training-resources" element={<AshaTrainingResources />} />
            <Route path="/asha-incentives" element={<AshaIncentives />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </TranslationProvider>
    </AppSettingsProvider>
  );
}

export default App;
