import './Reset.css';
import "./Scss/style.css";
// ===== Redux.
import { useSelector } from 'react-redux';
// ===== Components.
import Sidebar from './Components/Sidebar';
import ShowSidebar from './Components/ShowSidebar';
import Main from './Components/Main';

function App() {
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkMode ? "App" : "App App-light"} >

      <div className={`sidebar-content-container ${isSidebarHidden ? "hidden" : ""}`}>
        <Sidebar />
      </div>

      <div className={`main-content-container ${isSidebarHidden ? "wide" : ""}`}>
        <ShowSidebar />
        <Main />
      </div>

    </div>
  );
}

export default App;