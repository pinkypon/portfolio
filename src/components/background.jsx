import React from "react";

const Background = () => {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="h-[60vh] w-[60vh] rounded-full bg-gradient-to-br absolute -top-32 -left-32 from-indigo-200 via-lime-200 to-purple-300 opacity-20 blur-2xl dark:opacity-0"></div>
        <div className="h-[40vh] w-[50vh] rounded-full bg-gradient-to-tr absolute -bottom-20 right-10 from-fuchsia-300 via-orange-300 to-rose-200 opacity-40 blur-3xl dark:opacity-0"></div>
        <div className="h-[35vh] w-[45vh] rounded-full bg-gradient-to-b dark:h-[28vh] absolute top-28 left-1/4 from-orange-300 via-amber-200 to-rose-100 opacity-60 blur-3xl dark:from-orange-600 dark:via-amber-500 dark:to-rose-400 dark:opacity-10"></div>
      </div>
      <div className="dark:bg-gradient-to-br absolute inset-0 -z-10 overflow-hidden dark:from-neutral-950 dark:via-slate-900 dark:to-neutral-950">
        <div
          style={{ animation: "12s linear 0s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/60 absolute top-10 left-20 opacity-0 dark:opacity-90"
        ></div>
        <div
          style={{ animation: "15s linear 2s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-md shadow-white/40 absolute top-5 right-32 opacity-0 dark:opacity-80"
        ></div>
        <div
          style={{ animation: "10s linear 4s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50 absolute top-20 left-1/2 opacity-0 dark:opacity-95"
        ></div>
        <div
          style={{ animation: "18s linear 6s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-sm shadow-white/30 absolute top-32 right-10 opacity-0 dark:opacity-85"
        ></div>
        <div
          style={{ animation: "9s linear 1s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/70 absolute top-80 left-20 opacity-0 dark:opacity-100"
        ></div>
        <div
          style={{ animation: "14s linear 3s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-md shadow-white/35 absolute top-16 left-3/4 opacity-0 dark:opacity-75"
        ></div>
        <div
          style={{ animation: "11s linear 7s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/55 absolute top-40 left-10 opacity-0 dark:opacity-90"
        ></div>
        <div
          style={{ animation: "16s linear 5s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-sm shadow-white/40 absolute top-60 right-20 opacity-0 dark:opacity-80"
        ></div>
        <div
          style={{ animation: "13s linear 8s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/60 absolute top-24 left-1/3 opacity-0 dark:opacity-95"
        ></div>
        <div
          style={{ animation: "17s linear 9s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-md shadow-white/45 absolute top-8 right-1/4 opacity-0 dark:opacity-85"
        ></div>
        <div
          style={{ animation: "8s linear 10s infinite normal none running falling-star" }}
          className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/65 absolute top-50 left-16 opacity-0 dark:opacity-100"
        ></div>
        <div
          style={{ animation: "19s linear 11s infinite normal none running falling-star" }}
          className="w-0.5 h-0.5 bg-white rounded-full shadow-sm shadow-white/30 absolute top-12 right-1/3 opacity-0 dark:opacity-75"
        ></div>
      </div>
      <style jsx>{`
        @keyframes falling-star {
          0% {
            transform: translateY(-100vh) translateX(0) rotate(45deg);
            opacity: 0;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3), 0 0 10px 4px rgba(255, 255, 255, 0.1);
          }
          5% {
            opacity: 1;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.6), 0 0 10px 4px rgba(255, 255, 255, 0.2);
          }
          95% {
            opacity: 1;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.6), 0 0 10px 4px rgba(255, 255, 255, 0.2);
          }
          100% {
            transform: translateY(100vh) translateX(100px) rotate(45deg);
            opacity: 0;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3), 0 0 10px 4px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </>
  );
};

export default Background;