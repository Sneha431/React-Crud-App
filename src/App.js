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
import ProductListUser from "./components/Products/ProductListUser";
import PasswordResset from "./components/PasswordResset";
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
                <ProductListUser />
              </UserElement>
            }
          />
          <Route path="/forgetpassword" element={<PasswordResset />} />
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
