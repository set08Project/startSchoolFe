document.title = "School's Store";
import { useState } from "react";
import LittleHeader from "../../../components/layout/LittleHeader";
import Button from "../../../components/reUse/Button";
import StoreView from "./StoreView";
import StoreItems from "./StoreItems";
import { useDispatch, useSelector } from "react-redux";
import CartItemScreen from "./CartItemScreen";
import { displayCart } from "../../../global/reduxState";
import { BsCart4 } from "react-icons/bs";

const ViewStoreItems = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const cartToggle = useSelector((state: any) => state.cartToggle);
  const cart = useSelector((state: any) => state?.cart);
  console.log("cartToggle:", cartToggle);

  const changeView = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      dispatch(displayCart(false));
    } else {
      document.startViewTransition(() => {
        setToggle(!toggle);
        dispatch(displayCart(false));
      });
    }
  };

  const changeViewCart = () => {
    if (!document.startViewTransition) {
      setToggle(!toggle);
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        setToggle(!toggle);
        dispatch(displayCart(!cartToggle));
      });
    }
  };
  return (
    <div className="text-blue-950 relative">
      <LittleHeader name={toggle ? "School's Store" : "School's items"} />

      {/* <div className="my-5 " /> */}

      <div className="flex justify-between mb-10 w-full">
        <div className=" flex items-center">
          <Button
            name="Store View"
            className="ml-0 bg-orange-500  "
            onClick={changeView}
          />

          <Button
            name="Store Items"
            className="ml-0 bg-blue-950 "
            onClick={changeView}
          />
        </div>
        <div className=" flex items-center">
          <div className="w-full flex justify-end mb-5">
            <div
              className="mr-10 relative cursor-pointer"
              onClick={changeViewCart}
            >
              <BsCart4 size={27} />
              <div className="absolute -top-1 flex justify-center items-center bg-red-500 text-white rounded-full w-4 h-4 text-[12px] font-medium -right-1">
                {cart?.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md w-full relative">
        <div className="p-2">{toggle ? <StoreView /> : <StoreItems />}</div>

        {cartToggle && (
          <div
            className="absolute top-0 p-0 w-full min-h-full pb-10
             rounded-md bg-white"
            style={{
              // background: "rgba(73, 154, 255, 10)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(73, 154, 255, 0.3)",
            }}
          >
            <CartItemScreen />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStoreItems;
