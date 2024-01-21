// FileUploadComponent.js

import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import Input from "../../Components/Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import vectorImage from "../../assets/Vectors.png";
import SvgComponent from "../../Components/SvgComponent";

const CreateMovie = () => {
  const token = localStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const retrieveMovie = async (id) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/movie?id=${id}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status == 200) {
        setTitle(response?.data?.data?.name);
        setYear(response?.data?.data?.year);
        setStatus(response?.data?.status);
        setSelectedFile({ name: response?.data?.data?.image });
        setResponseMessage(response?.data?.message);
      }
    } catch (error) {
      setStatus(error?.response?.data?.status);
      setResponseMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    retrieveMovie(id);
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!title || !year || !selectedFile) {
        setStatus(409);
        setResponseMessage("All fields are required");
        return;
      }
      if (year.length < 4 || !/^\d+$/.test(year) || parseInt(year) <= 1960) {
        setStatus(409);
        setResponseMessage(
          "Year must be 4 characters or more, numeric, and >= 1960."
        );
        return;
      }
      let apiUrl;
      apiUrl = `${process.env.REACT_APP_API_URL}/movie?id=${id}`;
      if (!id) {
        apiUrl = `${process.env.REACT_APP_API_URL}/movie`;
      }
      // Your request payload

      const formData = new FormData();
      formData.append("name", title);
      formData.append("year", year);
      formData.append("image", selectedFile);
      
      // Make a POST request to the API endpoint
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response?.status == 200) {
        if (!id) {
          setTitle("");
          setYear("");
        }
        setStatus(response?.data?.status);
        setResponseMessage(response?.data?.message);
        navigate("/movie-page");
      }
    } catch (error) {
      setStatus(error?.response?.data?.status);
      setResponseMessage(error?.response?.data?.message);
    }
  };

  if (status == 404) {
    return (
      <div className="App">
        <h1>Movie Not Found</h1>
      </div>
    );
  }
  return (
    <div className="create-main-div ">
      {status == 200 && (
        <div className="alert alert-primary msgDiv" role="alert">
          {responseMessage}
        </div>
      )}
      {status == 409 && (
        <div className="alert alert-danger msgDiv" role="alert">
          {responseMessage}
        </div>
      )}
      <div className="container">
        {id ? (
          <h2 className="creat-heading"> Edit</h2>
        ) : (
          <h2 className="creat-heading"> Create a new movie</h2>
        )}
        <div className="create">
          <div
            className="file-upload-container"
            onClick={() => fileInputRef.current.click()}
            style={
              selectedFile && Object.keys(selectedFile).length === 1 && !image
                ? {
                    backgroundImage: `url(${process.env.REACT_APP_API_URL}/${selectedFile?.name})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }
                : {
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }
            }
          >
            {
              <span
                className="download-icon"
                role="img"
                aria-label="download icon"
              >
                <SvgComponent name={"DownloadIcon"} />
              </span>
            }
            {<p className="upload-message">Drop an image here</p>}
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleFileChange}
              ref={fileInputRef}
              name="selectedFile"
            />

            {selectedFile && (
              <p className="selected-file">
                Selected Image: <strong>{selectedFile?.name}</strong>
              </p>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            class="d-flex flex-column gap-3 mx-auto w-25"
          >
            <div>
              <Input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div style={{ width: "216px" }}>
              <Input
                type="text"
                placeholder="Publish year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </div>

            <div className="d-flex flex-row gap-3 buttonsDiv">
              <button
                className="btn btn-outline-light p-3 w-100"
                onClick={() => navigate("/movie-page")}
              >
                Cancel
              </button>
              <button className="btn btn-success p-3 w-100 ">
                {id ? <span>Update</span> : <span>Submit</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
