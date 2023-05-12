import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [imagename, setimagename] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });
  const navigate = useNavigate();
  const params = useParams();
  const prodid = params.id;
  useEffect(() => {
    getsingleproduct();
  }, []);
  const getsingleproduct = async (e) => {
    const result = await fetch(`http://localhost:5000/product/${prodid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();
    setimagename(json.imagename);
    setname(json.name);
    setprice(json.price);
    setcategory(json.category);
    setcompany(json.company);
  };
  const handleFileChange = (e) => {
    let img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(img);
    setImage(img.preview);
    // setimagename(img.data);
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    } else {
      seterror(false);
    }

    const result = await fetch(`http://localhost:5000/update/${prodid}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        imagename: image,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();
    console.log(json);
    if (json) {
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="form-style-5">
      <form>
        <fieldset>
          <legend>
            <span className="number">1</span> Update Product
          </legend>
          <input type="hidden" value={prodid} name="id" />
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
        </fieldset>
        <img src={imagename} alt="" />
        <img src={image.preview} alt="" />
        <input type="submit" value="Update" onClick={updateProduct} />
      </form>
    </div>
  );
};

export default UpdateProduct;
