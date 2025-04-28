// import Image from "next/image";
// import logo from "@/media/Images/logo.jpg";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Logo() {
  return (
    <div className="logo-container">
      <Link to={"/"}>
        {/* <Image src={logo} alt="logo" /> */}
        <h2>Logo</h2>
      </Link>
    </div>
  );
}
