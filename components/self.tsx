import PFP from "./pfp";
import React from "react";
import config from "../config";

const Self = () => {
  return (
    <div className="flex z-0 flex-wrap justify-center items-center self-center m-10 mt-32 h-full select-none">
      {/* <img src={config.banner} alt="banner" className="absolute object-none  w-full h-96 z-0" /> */}

      <PFP src={config.pfp} size={120} className="z-10 h-36 rounded-full" />

      <div className="z-10 self-center m-6 text-2xl hover:text-3xl decoration-0">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        I'm{" "}
        <span className="text-cyan-400 select-all">
          {" "}
          {config.name
            .split(" ")
            .reverse()
            .reduce(
              (t, e, i) =>
                (
                  <span key={i}>
                    {e} {t}
                  </span>
                ) as any,
              ""
            )}{" "}
        </span>
      </div>
    </div>
  );
};

export default Self;
