import React from "react";

export const Sidebar = () => {
  return (
    <div class="container float-left sidebar column">
      <nav id="sidebar" class="order-last">
        <div class="">
          <h1>
            <a href="index.html" class="logo">
              Weather
            </a>
          </h1>
          <h4>Open Weather API</h4>

          <div class="mb-5 px-4">
            <h3 class="h6 mb-3">Search for a City</h3>
            <form class="subscribe-form">
              <input
                id="userInput"
                type="text"
                class="form-control"
                placeholder="Enter City Name"
              />
            </form>
          </div>

          <ul id="ae-list" class="list-unstyled components mb-5">
            <li>
              <a href="#Houston" class="default hou">
                Houston
              </a>
            </li>
            <li>
              <a href="#Austin" class="default atx">
                Austin
              </a>
            </li>
            <li>
              <a href="#Dallas" class="default dtx">
                Dallas
              </a>
            </li>
            <li>
              <a href="#Chicago" class="default chi">
                Chicago
              </a>
            </li>
            <li>
              <a href="#Las-Vegas" class="default lv">
                Las Vegas
              </a>
            </li>
          </ul>
          <div class="footer px-4">
            <p>
              Copyright &copy;
              <i class="icon-heart">♥</i> by
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
