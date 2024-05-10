import React, { useEffect, useState } from "react";
import "./GetImage.scss";
import { axiosClient } from "../../utils/axiosClient";

function GetImage() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await axiosClient.get("/img/getImg");
      const fetchedImages = response.result.images;
      setImages([...fetchedImages]);
      setFilteredImages([...fetchedImages]);
    } catch (error) {
      console.log("Error fetching images: ", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredImgs = images.filter((img) =>
      img.imgName.toLowerCase().includes(searchTerm)
    );

    setFilteredImages(filteredImgs);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
        value={search}
        style={{
          padding: "5px 10px",
          marginBottom: "20px",
        }}
      />
      <div className="displayImages">
        {filteredImages?.map((data) => (
          <div className="image" key={data._id}>
            <img src={data.image.url} alt="image" />
            <p className="imgName">{data.imgName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetImage;
