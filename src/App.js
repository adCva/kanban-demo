import './Reset.css';
import "./Scss/style.css";
// ===== Redux.
import { useSelector } from 'react-redux';

function App() {
  const isDarkMode = useSelector((state) => state.ux.darkMode);
  const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);

  return (
    <div className={isDarkMode ? "App" : "App App-light"}>

      <div className={isSidebarHidden ? "sidebar-container sidebar-container-hide" : "sidebar-container"}>
        <h1>a</h1>
      </div>

      <div className='content-container'>
        a
      </div>

    </div>
  );
}

export default App;
