import React, { useState } from "react";
import "./UploadImage.scss";
import { axiosClient } from "../../utils/axiosClient";
import { BsCardImage } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

function UploadImage() {
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");
  const navigate = useNavigate();

  // function to handle selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImg(fileReader.result);
      }
    };
  };

  // function to upload image with name
  const handleImageSubmit = async () => {
    try {
      const result = await axiosClient.post("/img/createImg", {
        imgName,
        image: img,
      });
      console.log("post done", imgName, img);
      console.log(result);
    } catch (error) {
      console.log("error aaya", error);
    } finally {
      setImgName("");
      setImg("");
    }
  };

  // function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosClient.get("/auth/logout");
      console.log(response);
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploadImage">
      <div className="left-section">
        <input
          value={imgName}
          type="text"
          className="captionInput"
          placeholder="Image name"
          onChange={(e) => setImgName(e.target.value)}
          required
        />

        {/* shows the selected image */}
        {img && (
          <div className="img-container">
            <img className="upload-img" src={img} alt="upload-img" />
          </div>
        )}

        {/* bottom-part contains the button to select image and upload image */}
        <div className="bottom-part">
          <div className="input-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className="upload-btn" onClick={handleImageSubmit}>
            Upload
          </button>
        </div>
      </div>
      <div className="right-section">
        <IoMdLogOut id="logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default UploadImage;
