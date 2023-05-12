import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const AddProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");

  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    let img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(img);
    setImage(img.preview);
    // setimagename(img.data);
  };
  const addProduct = async (e) => {
    console.log(image);
    e.preventDefault();
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    } else {
      seterror(false);
    }

    let decoded = jwt_decode(localStorage.getItem("auth"));

    const userId = decoded.updated_result.id;

    const result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        userId,
        imagename: image,
      }),
    });
    const json = await result.json();
    console.log(json);
    if (json._id) {
      navigate("/");
    } else {
      alert("Enter correct details");
    }

    /////
  };

  return (
    <div className="form-style-5">
      <form enctype="multipart/form-data">
        <fieldset>
          <legend>
            <span className="number">1</span> Product Info
          </legend>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setname(e.target.value)}
          />
          {error && !name && <span className="error">Enter a valid name</span>}
          <input
            type="text"
            placeholder="Price *"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
          {error && !price && (
            <span className="error">Enter a valid price</span>
          )}
          <input
            type="text"
            placeholder="Category *"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          {error && !category && (
            <span className="error">Enter a valid category</span>
          )}
          <input
            type="text"
            placeholder="Company *"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
          />

          {error && !company && (
            <span className="error">Enter a valid company</span>
          )}

          <input type="file" name="files" onChange={handleFileChange} />
          {/* <input type="text" value={image.data} name="imagename" /> */}
          <img src={image.preview} alt="" />
        </fieldset>

        <input type="submit" value="Add" onClick={addProduct} />
      </form>
    </div>
  );
};

export default AddProduct;
