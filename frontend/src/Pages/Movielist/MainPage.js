// MoviesPage.js

import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SvgComponent from "../../Components/SvgComponent";
import Input from "../../Components/Input";

const MoviesPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const moviesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(count / moviesPerPage);
  // const startIndex = (currentPage - 1) * moviesPerPage;
  // const endIndex = Math.min(startIndex + moviesPerPage, movies.length);

  const retrieveMovie = async () => {
    try {
      const apiUrl = `${
        process.env.REACT_APP_API_URL
      }/movie?favourites=${false}&&moviesPerPage=${8}&&page=${currentPage}&&search=${searchTerm}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("response", response);
      if (response.status === 200) {
        setMovies(response?.data?.data?.moviesWithFavorites);
        setCount(response?.data?.data?.count);
        setLoading(false);
      }
    } catch (error) {
      setStatus(error?.response?.data?.status);
      setLoading(false);
    }
  };
  console.log("movies", movies);

  useEffect(() => {
    retrieveMovie();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFavorite = async (movieId) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/movie/update`;
      await axios.put(
        apiUrl,
        { movieid: movieId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // [******agr state se handle krna or api lisitng ki dobara ni call krni ******** ]
      // const movieIndex = movies.findIndex((movie) => movie.id === movieId);

      // if (movieIndex !== -1) {
      //   const updatedMovies = [...movies];
      //   updatedMovies[movieIndex] = {
      //     ...updatedMovies[movieIndex],
      //     isFavorite: !updatedMovies[movieIndex].isFavorite,
      //   };

      //   setMovies(updatedMovies);
      // }
      retrieveMovie();
    } catch (error) {
      console.error("Error Updating favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="App d-flex justify-content-center">
        <h1>Loading.... </h1>
      </div>
    );
  }

  return (
    <div className="main-div">
      {movies?.length === 0 ? (
        <div className="add-movie-section">
          <p>Your movie list is empty</p>
          <button
            className="btn btn-success addBtn"
            onClick={() => navigate("/create")}
          >
            Add a new movie
          </button>
        </div>
      ) : (
        <div className="container moviepage">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <span className="main-heading" style={{ fontSize: "56px" }}>
                    My movies
                  </span>
                  <span onClick={() => navigate("/create")}>
                    <SvgComponent name={"PlusIcon"} />
                  </span>
                </li>
              </ul>
              <form className="form-inline">
                {/* <input
                  type="text"
                  placeholder="Search"
                  className="form-control mr-sm-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                <div>
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item  custom-nav-item">
                  <span className="logoutText">Logout</span>
                  <span
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    <SvgComponent name={"LogOut"} />
                  </span>
                </li>
              </ul>
            </div>
          </nav>
          <div className="row justify-content-evenly">
            {/* {movies?.slice(startIndex, endIndex).map((movie) => ( */}
            {movies?.map((movie) => (
              <div
                className="col-lg-3 col-md-6 col-12 mt-4 custom-col addsvg card mycard"
                style={{ width: "18rem" }}
                key={movie.id}
              >
                {/* <div className="card mycard" style={{ width: "18rem" }}> */}
                <span
                  className="text-light text-start position-absolute top-0 start-0"
                  onClick={() => navigate(`/edit/${movie?.id}`)}
                >
                  <SvgComponent name={"EditIcon"} />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill={movie?.isFavorite ? "red" : "blue"}
                  // fill={"red"}
                  className="heart-icon position-absolute top-0 end-0"
                  onClick={() => handleFavorite(movie.id)}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <img
                  // style={{ height: "400px", width: "266px" }}
                  style={{ height: "400px" }}
                  src={
                    movie?.image &&
                    `${process.env.REACT_APP_API_URL}/${movie?.image}`
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{movie?.name}</h5>
                  <p className="card-text">{movie?.year}</p>
                </div>
                {/* </div> */}
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="btn btn-outline-none bg-transparent text-light fs-4"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  style={{ width: "50px" }}
                  key={page}
                  className={`btn btn${
                    page === currentPage ? "-success" : "-secondary"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="btn btn-outline-none bg-transparent text-light fs-4"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
