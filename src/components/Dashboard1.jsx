import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard1.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://api.itbook.store/1.0/search/mongodb"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="app-stylish-background">
      <div className="container py-5 bg-light">
        <h2 className="display-5 fw-bold text-center mb-5 text-dark">
          MongoDB Books
        </h2>
        {loading ? (
          <p className="text-center text-muted fs-5">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger fs-5">Error: {error}</p>
        ) : books.length === 0 ? (
          <p className="text-center text-muted fs-5">No books found</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {books.map((book) => (
              <div key={book.isbn13} className="col">
                <div className="card h-100 shadow-sm border-0 transition-transform">
                  <img
                    src={
                      book.image ||
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e9ecef"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12" fill="%236c757d">No Image</text></svg>'
                    }
                    className="card-img-top img-fluid"
                    alt={book.title}
                    style={{
                      height: "220px",
                      objectFit: "contain",
                      padding: "15px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                  <div className="card-body bg-white">
                    <h5 className="card-title fw-semibold text-dark mb-3 hover-primary">
                      {book.title}
                    </h5>
                    <h6 className="card-subtitle mb-3 text-muted">
                      {book.subtitle || "N/A"}
                    </h6>
                    <p className="card-text">
                      <strong className="text-dark hover-success">ISBN:</strong>{" "}
                      {book.isbn13}
                      <br />
                      <strong className="text-dark hover-success">
                        Price:
                      </strong>{" "}
                      {book.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
