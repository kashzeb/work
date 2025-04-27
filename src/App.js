import "./style.scss"; // Import SCSS file
import './App.css';
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import {AppProvider} from "./AppContext";
import AboutSection from "./AboutSection";
import Experiences from "./Experiences";
import SkillSet from "./SkillSets";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
         />
      <main className='main-wrapper'>
        <Sidebar />

        <MainContent />

        
      </main>
      </Router>
    </AppProvider>
  );
}

export default App;
