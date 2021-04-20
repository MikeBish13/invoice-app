import React from "react";
import Logo from "../images/logo.svg";
import Avatar from "../images/image-avatar.jpg";
import IconSun from "../images/icon-sun.svg";
import IconMoon from "../images/icon-moon.svg";
import { useState } from "react";

export default function SideBar() {
  const [dayTime, setDayTime] = useState(true);

  const setDarkMode = () => {
    setDayTime(!dayTime);
    document.body.getAttribute('data-theme') === 'dark' ? document.body.removeAttribute('data-theme', 'dark')
    : document.body.setAttribute('data-theme', 'dark');
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="invoice logo"></img>
      </div>
      <div className="navbar-right">
        <button className="toggleMode" onClick={() => setDarkMode()}>
          <img src={dayTime ? IconSun : IconMoon} alt="toggle button"></img>
        </button>
        <div className="divider"></div>
        <div className="avatar-holder">
          <img className="avatar" src={Avatar} alt="avatar"></img>
        </div>
      </div>
    </div>
  );
}
