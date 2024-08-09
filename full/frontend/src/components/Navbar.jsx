import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav>
        <div className="logo">Delicious Eats!</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          <a href='login'>LOGIN</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;