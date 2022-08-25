import React from "react";

export const Jumbotron = () => {
  return (
    <div class="p-5 text-center bg-image rounded-3 ae-head">
      <div class="mask" style="background-color: rgba(0, 0, 0, 0)">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div>
            <h1 class="mb-3">Weather</h1>
            <h4 class="mb-3">Using the Open Weather API</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
