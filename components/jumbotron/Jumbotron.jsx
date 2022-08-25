import React from "react";

export const Jumbotron = () => {
  return (
    <div className="p-5 text-center bg-image rounded-3 ae-head rounded-3xl text-3xl">
      <div className="mask">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div>
            <h1 className="mb-3">Weather</h1>
            <h4 className="mb-3">Using the Open Weather API</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
