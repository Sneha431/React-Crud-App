import "./App.css";
import Nav from "./components/Nav";
import "./assets/css/nav.css";
import "./assets/css/footer.css";
import "./assets/css/login.css";
import "./assets/css/add_product.css";
import "./assets/css/productlist.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/Products/AddProduct";
import ProductList from "./components/Products/ProductList";
import UpdateProduct from "./components/Products/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <ProductList />
                  <Footer />
                </>
              }
            />
            <Route
              path="/add"
              element={
                <>
                  <Nav />
                  <AddProduct />
                  <Footer />
                </>
              }
            />
            <Route
              path="/update/:id"
              element={
                <>
                  <Nav />
                  <UpdateProduct />
                  <Footer />
                </>
              }
            />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/products" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
