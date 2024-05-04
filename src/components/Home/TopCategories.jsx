import React, { useEffect, useRef } from "react";
//hook
// import UseFetch from "../../Hooks/UseFetch";
//functions
import { ScrollByMouse } from "../../functions/ScrollByMouse";
//redux
import { useSelector } from "react-redux";
//skeleton
import TopCategoriesSkeleton from "../../skeleton/TopCategoriesSkeleton";
//css
import "../../css/Home/TopCategories.css";
//variables
let scrollLeft = 0;
let startX;
let isDown = false;

function TopCategories() {
  const top_categories_slide = useRef();
  const categories = useSelector((state) => state.categories);

  //handle scrolling
  useEffect(() => {
    ScrollByMouse(top_categories_slide, startX, scrollLeft, isDown);
  }, [isDown]);
  return (
    <div className="top_categories z-10">
      <h1 className="my-4 font-bold text-2xl">Shop Our Top Categories</h1>
      <div
        ref={top_categories_slide}
        className="row categories overflow-x-auto   flex  items-center gap-6 py-6 cursor-pointer"
      >
        {/* skeleton untel load the data */}
        {categories?.length === 0 &&
          Array.from({ length: 10 }).map((_, i) => (
            <TopCategoriesSkeleton key={i} />
          ))}
        {categories?.map((category) => (
          <div
            className={`category text-center rounded-lg shadow-md `}
            style={{ backgroundColor: category.bg_color }}
            key={category._id}
          >
            <div className={` relative content grid place-content-center `}>
              <h2 className="title text-white font-bold py-2 ">
                {category.category}
              </h2>
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${category.img}`}
                alt=""
                className="absolute top-0 "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
