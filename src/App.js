import './Reset.css';
import "./Scss/style.css";
// ===== Redux.
import { useSelector } from 'react-redux';
// ===== Components.
import Sidebar from './Components/Sidebar';

function App() {
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkMode ? "App" : "App App-light"} >

      <div className={isSidebarHidden ? "left-container left-container-hide" : "left-container"}>
        <Sidebar />
      </div>
      
      <div className='right-container'>
        Content
      </div>

    </div>
  );
}

export default App;
