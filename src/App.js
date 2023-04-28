import "./App.css";

import "./assets/css/nav.css";
import "./assets/css/cart.css";
import "./assets/css/footer.css";
import "./assets/css/login.css";
import "./assets/css/add_product.css";
import "./assets/css/productlist.css";
import "./assets/css/cartpage.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Header_Footer/Nav";
import Footer from "./components/Header_Footer/Footer";
import Login from "./components/Login_Signup/Login";
import SignUp from "./components/Login_Signup/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/Admin/Products/AddProduct";
import ProductList from "./components/Admin/Products/ProductList";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";

import PasswordResset from "./components/Login_Signup/PasswordResset";
import ViewProduct from "./components/User/ViewProduct";
import CartItem from "./components/User/CartItem";
const USER_TYPES = {
  PUBLIC_USER: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};
const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
              path="/shoppingcart"
              element={
                <>
                  <Nav />
                  <CartItem />
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

            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <UserElement>
                <ProductList />
              </UserElement>
            }
          />
          <Route path="/forgetpassword" element={<PasswordResset />} />
          <Route
            path="/viewproduct/:id"
            element={
              <>
                <Nav />
                <ViewProduct />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );

  function UserElement({ children }) {
    if (
      CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ||
      CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER
    ) {
      return <>{children}</>;
    } else {
      return (
        <>
          <Login />
        </>
      );
    }
  }
}

export default App;
