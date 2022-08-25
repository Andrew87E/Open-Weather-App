import React from "react";

export const Sidebar = () => {
  return (
    <div className="container float-left sidebar column rounded-3xl w-64">
      <nav id="sidebar" className="order-last">
        <div className="">
          <h1>
            <a href="index.html" className="logo">
              Weather
            </a>
          </h1>
          <h4>Open Weather API</h4>

          <div className="mb-5 px-4">
            <h3 className="h6 mb-3">Search for a City</h3>
            <form className="subscribe-form">
              <input
                id="userInput"
                type="text"
                className="form-control"
                placeholder="Enter City Name"
              />
            </form>
          </div>

          <ul id="ae-list" className="list-unstyled components mb-5">
            <li>
              <a href="#Houston" className="default hou">
                Houston
              </a>
            </li>
            <li>
              <a href="#Austin" className="default atx">
                Austin
              </a>
            </li>
            <li>
              <a href="#Dallas" className="default dtx">
                Dallas
              </a>
            </li>
            <li>
              <a href="#Chicago" className="default chi">
                Chicago
              </a>
            </li>
            <li>
              <a href="#Las-Vegas" className="default lv">
                Las Vegas
              </a>
            </li>
          </ul>
          <div className="footer px-4">
            <p>
              Copyright &copy;
              <i className="icon-heart">♥</i> by
              <a href="https://github.com/Andrew87e" target="_blank">
                Andrew
              </a>
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};
