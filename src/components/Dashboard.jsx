import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        const uniqueCategories = [
          "All",
          ...new Set(json.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => setError(err.message));
  }, []);

  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  if (error)
    return <p className="text-danger text-center mt-4 fs-5">Error: {error}</p>;
  if (!data.length)
    return <p className="text-center mt-4 fs-5 text-muted">Loading...</p>;

  return (
    <div className="dashboard-pattern-background">
      <div className="container mt-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark">
            🛍️ Explore Our Products
          </h1>
          <p className="text-muted fs-5">
            Find the best items at unbeatable prices
          </p>
        </header>

        <div className="d-flex justify-content-end mb-4">
          <div className="w-auto">
            <label
              htmlFor="categorySelect"
              className="form-label fw-semibold me-2 text-dark"
            >
              Filter by Category:
            </label>
            <select
              id="categorySelect"
              className="form-select form-select-sm d-inline-block w-auto shadow-sm border-primary-subtle hover-border-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredData.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 transition-transform hover-shadow">
                <img
                  src={product.image}
                  className="card-img-top rounded-top-4"
                  alt={product.title}
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                  }}
                />
                <div className="card-body d-flex flex-column bg-white">
                  <h6 className="card-title fw-semibold text-dark mb-2 hover-primary">
                    {product.title}
                  </h6>
                  <small className="text-muted mb-2 text-capitalize">
                    {product.category}
                  </small>
                  <p className="card-text text-muted small flex-grow-1 mb-3">
                    {product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                  </p>
                  <div className="mt-auto text-end">
                    <button className="badge bg-success fs-6 border-0 hover-bg-success-dark">
                      ₹{product.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
