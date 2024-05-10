import React from "react";
import UploadImage from "../../components/uploadImage/UploadImage";
import GetImage from "../../components/getImages/GetImage";

function Home() {
  return (
    <div>
      {/* Component to upload images */}
      <UploadImage />
      {/* Component to see images and search by names */}
      <GetImage />
    </div>
  );
}

export default Home;
