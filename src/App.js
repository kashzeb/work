import "./style.scss"; // Import SCSS file
import './App.css';
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import {AppProvider} from "./AppContext";

function App() {
  return (
    <AppProvider>
      <main className='main-wrapper'>
        <Sidebar />
        <MainContent />
      </main>
    </AppProvider>
  );
}

export default App;
