import "./style.scss"; // Import SCSS file
import './App.css';
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import {AppProvider} from "./AppContext";
import AboutSection from "./AboutSection";
import Experiences from "./Experiences";
import SkillSet from "./SkillSets";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppProvider>
      <Router>
      <main className='main-wrapper'>
        <Sidebar />

        <MainContent />

        
      </main>
      </Router>
    </AppProvider>
  );
}

export default App;
