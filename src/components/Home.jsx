import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const goToDashboard1 = () => {
    navigate("/dashboard1");
  };

  return (
    <div className="home-stylish-background d-flex flex-column justify-content-center align-items-center min-vh-100 p-4">
      <h1 className="display-4 fw-bold text-dark mb-5">Welcome to Our Store</h1>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <button
          onClick={goToDashboard}
          type="button"
          className="btn btn-primary btn-lg shadow-sm hover-scale"
        >
          Explore Products
        </button>
        <button
          onClick={goToDashboard1}
          type="button"
          className="btn btn-lg shadow-sm hover-scale"
          style={{ backgroundColor: "#ff6f61", borderColor: "#ff6f61" }}
        >
          View BookStore
        </button>
      </div>
    </div>
  );
}

export default Home;
