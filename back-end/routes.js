import { signUp, login, checkIfLoggedIn } from "./controllers/auth-controller.js";
import { getProducts, addProduct, findProduct } from "./controllers/product-controller.js";
import { getCarts, addCartItem } from "./controllers/cart-controller.js"

const setUpRoutes = (app) => {
  app.get("/", (req, res) => { res.send("API Home") });
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/get-products", getProducts);
  app.post("/add-product", addProduct);
  app.get("/get-carts", getCarts);
  app.post("/add-cart-item", addCartItem);
  app.post("/find-product", findProduct);
}

export default setUpRoutes;
