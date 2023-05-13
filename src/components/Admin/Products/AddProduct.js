import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AddProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");

  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState(false);
  const [image, setImage] = useState({ preview: "", imgname: "" });
  const [imagename, setImagename] = useState("No_Image_Available.jpg");
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    let img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0].name,
    };
    console.log(img);
    setImage(img);


        }
  const submitimage = async(e)=>{
    e.preventDefault();
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("data", imagedata);
   
   

  fetch("http://localhost:5000/upload", {
      mode: 'no-cors',
      method: "POST",
      body: data
    }).then(function (res) {
      setImagename(imagedata.name);
      if (res.ok) {
        alert("Perfect! ");
       
      
      } else if (res.status === 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  }
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
        imagename
    
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
      <form>
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

          {/* <input type="file" name="files" onChange={handleFileChange} /> */}
          {/* <input type="text" value={image.data} name="imagename" /> */}
          
          {/* <img src={require(`../../../assets/img_uploads/${imagename}`)} alt=""  height={200}/> */}
          <input type="file" name="image" onChange={handleFileChange}/>
          <img src={image.preview} alt=""  height={200}/>
          <button onClick={submitimage}>Upload</button>
        </fieldset>

        <input type="submit" value="Add" onClick={addProduct} />
      </form>

      {/* <form encType="multipart/form-data" action=""> */}
         
        {/* </form> */}

    </div>
  );
};

export default AddProduct;
