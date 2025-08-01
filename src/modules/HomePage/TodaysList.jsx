import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const TodaysList = ({ title }) => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const totalItems = 16;
  const [visibleCount, setVisibleCount] = useState(8);
  const toggleShow = () => {
    setVisibleCount((prev) => (prev === 8 ? totalItems : 8));
  };

  const { data, loading: loadingData, error: errorData } = useFetch({
    url: `https://api.jikan.moe/v4/schedules/${dayName}`,
  });

  return (
    <div className="bg-[#444] mb-5 py-[30px] px-[20px] glass-effect rounded-[10px] shadow select-none">
      <div className="flex flex-col lg:flex-row">
        <div className="today-anime-list basis-3/3">
          <h1 className="text-[#fff] text-[28px] font-[600] tracking-[1px] text-center md:text-left">{title}</h1>
          <p className="text-[#a5a5a5] text-[16px] font-[400] tracking-[1px] ps-1 text-center md:text-left pb-[20px]">
            Date: {today.toLocaleDateString()} - {dayName}
          </p>
          <div className="today-list px-[5px] md:px-[20px]">
            {data?.data?.map((today, id) => (
              <div
                key={id}
                className={`list transition-all duration-300 ease-in-out ${id < visibleCount ? "opacity-100" : "hidden"}`}
              >
                <div className="today-anime flex py-3 text-[16px] tracking-[1.5px] md:text-[22px] gap-x-[40px] text-[#fff] justify-start">
                  <div className="time w-[40px]">{today.broadcast?.time || "TBD"}</div>
                  <div className="anime-name">{today.title}</div>
                </div>
                <hr />
              </div>
            ))}

            <button
              onClick={toggleShow}
              className="mt-5 text-[22px] text-white cursor-pointer"
              type="button"
            >
              {visibleCount === 8 ? "Show More" : "Show Less"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysList;
