import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMiniXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

const Menu = () => {
  const { pathname } = useLocation(); // Get current path
  const [drop, setDrop] = useState(false);
  const dropRef = useRef()

  const hideSideBar = () => {
    const exit = document.querySelector(".exit") 
    const sideBar = document.querySelector(".resp-Menu") 
    sideBar.style.visibility = "hidden";
    sideBar.style.opacity = "0";
    sideBar.style.transform = "translateX(100%)";
    exit.style.display = "none";
  };

  const showSideBar = () => {
    const exit = document.querySelector(".exit") 
    const sideBar = document.querySelector(".resp-Menu") 
    sideBar.style.visibility = "visible";
    sideBar.style.opacity = "1";
    sideBar.style.transform = "translateX(0px)";
    exit.style.display = "block";
  };

  const handleDrop = () => {
    const plus = document.querySelector(".plus") 

    if (dropRef.current) {
      if (!drop) {
        setDrop(true);
        dropRef.current.style.display = "flex";
        if (plus) {
          plus.style.transform = "rotate(45deg)";
        }
      } else {
        setDrop(false);
        dropRef.current.style.display = "none";
        if (plus) {
          plus.style.transform = "rotate(0)";
        }
      }
    } else {
      console.error("dropRef is null or not attached to an element");
    }
  };

  const handleAppointment = () => {
    const bookPopUpElement = document.querySelector(".book-container");
    const sideBar = document.querySelector(".resp-Menu") ;
    sideBar.style.visibility = "visible";
    sideBar.style.opacity = "1";
    sideBar.style.transform = "translateX(0px)";
    if (bookPopUpElement) {
      (bookPopUpElement ).style.visibility = "visible";
    } else {
      console.warn("Element with class 'book-container' not found");
    }
  };

  const services = [
    { id: "1", pathName: "/hair-salon-in-mangalore", menu: "Hair" },
    { id: "2", pathName: "/nail-salon-in-mangalore", menu: "Nails" },
    { id: "3", pathName: "/facials-in-mangalore", menu: "Facials" },
    { id: "4", pathName: "/waxing-in-mangalore", menu: "Waxing" },
    { id: "5", pathName: "/makeup-in-mangalore", menu: "Makeup" },
  ];

  return (
    <div className="menu-container">
      <div className="menu-content1">
        <li>
          <Link to="/" className={pathname === "/" ? "active" : ""}>
            HOME
          </Link>
        </li>
        <li>
          <Link to="/services" className={pathname === "/services" ? "active" : ""}>
            SERVICES
          </Link>
        </li>
        <li>
          <Link to="/blog" className={pathname === "/blog" ? "active" : ""}>
            BLOG
          </Link>
        </li>
        <li>
          <Link to="/about-us" className={pathname === "/about-us" ? "active" : ""}>
            ABOUT US
          </Link>
        </li>
        <li>
          <Link to="/contact-us" className={pathname === "/contact-us" ? "active" : ""}>
            CONTACT US
          </Link>
        </li>
        <li>
          <button onClick={handleAppointment}>BOOK YOUR VISIT</button>
        </li>
      </div>

      {/* ----------------- Responsive Sidebar ----------------- */}
      <div className="menu-content2">
        <HiOutlineMenuAlt2 className="menuIcon" onClick={showSideBar} />
        <div className="resp-Menu">
          <div className="inner-RespMenu">
            <li>
              <div className="inner-RespMenuHead">
                <HiMiniXMark className="innerResp-MenuHeadIco" onClick={hideSideBar} />
              </div>
              <Link to="/" className={pathname === "/" ? "active" : ""} onClick={hideSideBar}>
                HOME
              </Link>
            </li>
            <li>
              <div className="respMenuList">
                <Link
                  to="/services"
                  className={pathname === "/services" ? "active" : ""}
                  onClick={hideSideBar}
                >
                  SERVICES
                </Link>
                <span>
                  <AiOutlinePlus className="plus" onClick={handleDrop} />
                </span>
              </div>
              <div className="respDrop" ref={dropRef}>
                <ul>
                  {services.map((x) => (
                    <li key={x.id}>
                      <Link
                        to={x.pathName}
                        className={pathname === x.pathName ? "active" : ""}
                        onClick={hideSideBar}
                      >
                        {x.menu}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link to="/about-us" className={pathname === "/about-us" ? "active" : ""} onClick={hideSideBar}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/blog" className={pathname === "/blog" ? "active" : ""} onClick={hideSideBar}>
                BLOG
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className={pathname === "/contact-us" ? "active" : ""}
                onClick={hideSideBar}
              >
                CONTACT US
              </Link>
            </li>
            <li className="menuContainerBtn-Container">
              <div className="menuContainerBtn">
                <Link to="#">
                  <button onClick={handleAppointment}>BOOK NOW</button>
                </Link>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
