import React, { useState } from "react";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const MouseEnter = () => {
    setIsDropdownOpen(true);
  };
  const MouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className={classes.navigationbar}>
      <div className={classes.logo}>My Website</div>
      <ul className={classes.navList}>
        <li className={classes.navItem}>Home</li>
        <li className={classes.navItem}>About</li>
        <li
          className={`${classes.dropdown} ${classes.navItem}`}
          onMouseEnter={MouseEnter}
          onMouseLeave={MouseLeave}
        >
          Services
          {isDropdownOpen && (
            <ul className={classes.dropdownList}>
              <li className={classes.dropdownItem}>Service 1</li>
              <li className={classes.dropdownItem}>Service 2</li>
              <li className={classes.dropdownItem}>Service 3</li>
            </ul>
          )}
        </li>
        <li className={classes.navItem}>Contact</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
