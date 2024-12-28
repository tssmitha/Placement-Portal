import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/StudentPages/Login";
import SignUp from "./pages/StudentPages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import StudentOnboardingForm from "./pages/StudentPages/StudentOnboardingForm";
import AdminLogin from './pages/AdminPages/AdminLogin';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import AdminHome  from "./pages/AdminPages/AdminHome";
import ReleaseForm from "./pages/AdminPages/ReleaseForm";
import ReleaseFormPage from "./pages/StudentPages/StudentForms";
import StudentForms from "./pages/StudentPages/Form";
// import PaymentPage from "./pages/PaymentPage";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./pages/theme/variables.css";
import Alumniconnect from "./pages/AlumniConnect";
import Ask from "./pages/Ask";
import Inbox from "./pages/Inbox";
import Problems from "./pages/Problems";
import Resources from "./pages/Resources";
import Communities from "./pages/Communities";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

setupIonicReact();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
    document.body.classList.toggle('light-theme', isDarkMode);
  };

  return (
  <IonApp>
    {" "}
   
    <IonReactRouter>
<<<<<<< HEAD
      <IonSplitPane contentId="main-content">
        {/* <Sidebar /> */}
=======
      <IonSplitPane contentId="main-content" className="main-content">
        <Sidebar />
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
>>>>>>> 803fa5f485d4919f0c07c6c5eda4609c8fadbe53

        <IonRouterOutlet id="main-content" className="main-content">
      
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          {/* <Route exact  path="/signup" component={SignUp} /> */}
          {/* <Route exact path="/studentOnboardingForm" component={StudentOnboardingForm} /> */}
          {/* <Route exact path="/payment" component={PaymentPage} /> */}
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/alumniconnect" component={Alumniconnect} />
          <Route exact path="/ask" component={Ask} />
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/problems" component={Problems} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-home" component={AdminHome} />
          <Route exact path="/admin-releaseForm/:formId" component={ReleaseForm} />
          <Route exact path="/student-form/:formId" component={ReleaseFormPage} />
          <Route exact path="/student-form" component={StudentForms} />
  
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>)
};

export default App;