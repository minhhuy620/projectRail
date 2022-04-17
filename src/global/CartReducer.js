import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const CartReducer = (state, action) => {
    
    const localStorageData = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"))
    const oldProduct = localStorageData.shoppingCart ?? [];
    let product;

    switch (action.type) {
        case "ADD_TO_CART":
            const check = oldProduct.find(
                (product) => product.ProductID === action.id
            );
            if (check) {
                toast.info("this product is already in your cart", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                break;
            } else {
                return ChangeValueCard(action.product, localStorageData);
            }
        case "DEC":
            product = action.cart;
            if (product.ProductQty > 1) {
                return DecData(action.id, localStorageData);
            } else {
                return DeleteProduct(action.id, localStorageData);
            }

        case "INC":
            product = action.cart;
            return IncData(action.id, localStorageData);

        case "DELETE":
            return DeleteProduct(action.id, localStorageData);

        case "EMPTY":
            return Empty();
        default:
            return state;
    }
};

const getPrice = (product) => {
    let totalPrice = 0;
    product.forEach((element) => {
        totalPrice = element.ProductPrice * element.ProductQty + totalPrice;
    });
    return totalPrice;
};

const getQty = (product) => {
    let totalQty = 0;
    product.forEach((element) => {
        totalQty = element.ProductQty + totalQty;
    });
    return totalQty;
};

const ChangeValueCard = (product, oldShopping = {}) => {
    const shoppingCart = oldShopping?.shoppingCart ?? [];
    const data = [...shoppingCart, product];
    const localStorageData = {
        shoppingCart: data,
        totalPrice: getPrice(data),
        totalQty: getQty(data),
    };
    localStorage.setItem("cart", JSON.stringify(localStorageData));
};

const Empty = () => {
    //   const localStorageData = {
    //     shoppingCart: [],
    //     totalPrice: 0,
    //     totalQty: 0,
    //   };
    //    localStorage.setItem("cart", JSON.stringify(localStorageData));
    localStorage.removeItem("cart");
}

const IncData = (id, oldShopping = {}) => {
    const shoppingCart = oldShopping?.shoppingCart ?? [];
    const index = shoppingCart.findIndex((item) => item.ProductID === id);
    shoppingCart[index] = {
        ...shoppingCart[index],
        ProductQty: ++shoppingCart[index].ProductQty,
    };
    const localStorageData = {
        shoppingCart: shoppingCart,
        totalPrice: getPrice(shoppingCart),
        totalQty: getQty(shoppingCart),
    };
    localStorage.setItem("cart", JSON.stringify(localStorageData));
};
const DecData = (id, oldShopping = {}) => {
    const shoppingCart = oldShopping?.shoppingCart ?? [];
    const index = shoppingCart.findIndex((item) => item.ProductID === id);
    shoppingCart[index] = {
        ...shoppingCart[index],
        ProductQty: --shoppingCart[index].ProductQty,
    };
    const localStorageData = {
        shoppingCart: shoppingCart,
        totalPrice: getPrice(shoppingCart),
        totalQty: getQty(shoppingCart),
    };
    localStorage.setItem("cart", JSON.stringify(localStorageData));
};

const DeleteProduct = (productId, oldShopping) => {
    const shoppingCart = oldShopping?.shoppingCart ?? [];
    const newProduct = shoppingCart.filter((item) => item.ProductID !== productId);
    const data = [...newProduct];
    const localStorageData = {
        shoppingCart: data,
        totalPrice: getPrice(data),
        totalQty: getQty(data),
    };
    localStorage.setItem("cart", JSON.stringify(localStorageData));
};