import "./style.scss"; // Import SCSS file
import './App.css';
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function App() {
  return (
    <main className='main-wrapper'>
      <Sidebar />
      <MainContent />
    </main>
  );
}

export default App;
