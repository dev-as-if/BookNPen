import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Layout from "./components/Layout";
import Home from "./pages/home";
import About from "./components/about";
import Contact from "./components/contact";
import Features from "./components/features";
import Gallery from "./components/gallery";
import Services from "./components/services";
import Placement from "./components/placement";
import Team from "./components/Team";
import Testimonials from "./components/testimonials";
import Training from "./components/training";
import Mission from "./components/mission";
import Vision from "./components/vision";
import CoreValues from "./components/core_values";
import Curriculum from "./components/curriculum";
import Methodology from "./components/methodology";
import Assessment from "./components/assessment";
import Facilities from "./components/facilities";
import Activities from "./components/activities";
import JsonData from "./data/data.json";
import Admissions from "./components/admission";
import Career from "./components/career";
import Donation from "./components/donate_us";
import Erp from "./components/erp";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ERPLogin from "./pages/ERPLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentAdmission from "./pages/StudentAdmission";
import ViewStudents from "./pages/ViewStudents";
import FeeCollection from "./pages/FeeCollection";
import FilterStudents from "./pages/FilterStudents";
import SearchStudent from "./pages/SearchStudent";
import ManageOperators from "./pages/ManageOperators";
import OperatorViewStudents from "./pages/OperatorViewStudents";




const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setLandingPageData(JsonData);
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) return <Splash />;

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About data={landingPageData.About} />} />
          <Route path="/mission" element={<Mission data={landingPageData.Mission} />} />
          <Route path="/vision" element={<Vision data={landingPageData.Vision} />} />
          <Route path="/core-values" element={<CoreValues data={landingPageData.Mission} />} />

          <Route path="/curriculum" element={<Curriculum data={landingPageData.Curriculum} />} />
          <Route path="/methodology" element={<Methodology data={landingPageData.Methodology} />} />
          <Route path="/assessment" element={<Assessment data={landingPageData.Assessment} />} />

          <Route path="/facilities" element={<Facilities data={landingPageData.Facilities} />} />

          <Route path="/activities" element={<Activities data={landingPageData.Activities} />} />

          <Route path="/admissions" element={<Admissions data={landingPageData.Admissions} />} />

          <Route path="/portfolio" element={<Gallery data={landingPageData.Gallery} />} />

          <Route path="/careers" element={<Career data={landingPageData.Career} />} />

          <Route path="/donate" element={<Donation />} />

          <Route path="/erp" element={<Erp />} />

          {/* New routes for backend */}

          <Route path="/erp-login" element={<ERPLogin />} />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/operator-dashboard"
            element={<ProtectedRoute role="operator"><OperatorDashboard /></ProtectedRoute>}
          />

          <Route
            path="/admit-student"
            element={
              <ProtectedRoute role="operator">
                <StudentAdmission />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-students"
            element={
              <ProtectedRoute role="operator">
                <ViewStudents />
              </ProtectedRoute>
            }
          />

          <Route path="/opview-students" 
          element={
              <ProtectedRoute role="operator">
                <OperatorViewStudents />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/fee-collection"
            element={
              <ProtectedRoute role="operator">
                <FeeCollection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-operator"
            element={<ProtectedRoute role="admin"><ManageOperators /></ProtectedRoute>}
          />
          <Route
            path="/admin-view-students"
            element={<ProtectedRoute role="admin"><ViewStudents /></ProtectedRoute>}
          />
          <Route
            path="/admin-search-student"
            element={<ProtectedRoute role="admin"><SearchStudent /></ProtectedRoute>}
          />
          <Route
            path="/admin-filter-students"
            element={<ProtectedRoute role="admin"><FilterStudents /></ProtectedRoute>}
          />



          {/* New routes end here */}


          <Route path="/features" element={<Features data={landingPageData.Features} />} />
          <Route path="/services" element={<Services data={landingPageData.Services} />} />
          <Route path="/team" element={<Team data={landingPageData.Team} />} />
          <Route path="/testimonials" element={<Testimonials data={landingPageData.Testimonials} />} />
          <Route path="/placement" element={<Placement data={landingPageData.Placement} />} />
          <Route path="/training" element={<Training data={landingPageData.Training} />} />
          <Route path="/contact" element={<Contact data={landingPageData.Contact} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
