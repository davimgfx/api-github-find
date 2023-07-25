import { Outlet } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <>
      <div className="root">
        <Outlet />
      </div>
    </>
  );
}

export default App;
