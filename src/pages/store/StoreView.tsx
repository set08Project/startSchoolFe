import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { displayCart } from "../../global/reduxState";

const StoreView = () => {
  const dispatch = useDispatch();
  const cartToggle = useSelector((state: any) => state.cartToggle);

  const changeView = () => {
    if (!document.startViewTransition) {
      dispatch(displayCart(!cartToggle));
    } else {
      document.startViewTransition(() => {
        dispatch(displayCart(!cartToggle));
      });
    }
    // displayCart;
  };
  return (
    <div>
      <div className="w-full flex justify-end mb-10">
        <div className="mr-10 relative cursor-pointer" onClick={changeView}>
          <BsCart4 size={25} />
          <div className="absolute -top-1 flex justify-center items-center bg-red-500 text-white rounded-full w-4 h-4 text-[12px] font-medium -right-1">
            3
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card min-w-60 bg-base-100 shadow-sm border rounded-md pb-0">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pb-4 px-3">
            <h2 className="card-title">Item's Title!</h2>
            <p>Item's Descriptions?</p>
            <div className="card-actions justify-end">
              <button className="btn bg-blue-950 hover:bg-blue-900 text-white rounded-md mt-4 ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
