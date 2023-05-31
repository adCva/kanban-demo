import './Reset.css';
import "./Scss/style.css";
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { hideSidebar } from "./Redux/UX";
// ===== Components.
import Sidebar from './Components/Sidebar';

function App() {
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkMode ? "App" : "App App-light"} >

      <div className={isSidebarHidden ? "left-container left-container-hide" : "left-container"}>
        <Sidebar />
      </div>
      
      <div className="right-container">
        <button className='hide-sidebar-btn' onClick={() => dispatch(hideSidebar())}>Show Sidebar</button>
      </div>
      

    </div>
  );
}

export default App;
