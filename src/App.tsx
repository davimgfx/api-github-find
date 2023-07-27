import { Outlet } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <>
      <div className="basic-config">
        <Outlet />
      </div>
    </>
  );
}

export default App;
