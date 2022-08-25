import React from "react";
import $ from 'jquery'

export const Sidebar = () => {
  const userInput = $("#userInput");
  const cityName = $('.default').text()
  const apiKey = process.env.APIKEY
  console.log(cityName)

  const handleClick = () => {
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
  }



  return (
    <div className="container float-left sidebar column rounded-3xl w-64">
      <nav id="sidebar" className="order-last">
        <div className="mt-4">
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
              <a href="#Houston" className="default hou" onClick={()=>{handleClick()}}>
                Houston
              </a>
            </li>
            <li>
              <a href="#Austin" className="default atx" onClick={()=>{handleClick()}}>
                Austin
              </a>
            </li>
            <li>
              <a href="#Dallas" className="default dtx" onClick={()=>{handleClick()}}>
                Dallas
              </a>
            </li>
            <li>
              <a href="#Chicago" className="default chi" onClick={()=>{handleClick()}}>
                Chicago
              </a>
            </li>
            <li>
              <a href="#Las-Vegas" className="default lv" onClick={()=>{handleClick()}}>
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
