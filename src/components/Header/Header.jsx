import { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/personnel",
    display: "Find a Nurse",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];
function Header() {
  const navigate = useNavigate();

  const { user, role, token } = useContext(authContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const logout = () => {
    navigate("/", { replace: true });
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*========== logo =========*/}
          <div>
            <img src={logo} alt="" />
          </div>
          {/*========== menu =========*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? `text-primaryColor text-[16px] leading-7 font-[600]`
                        : `text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor`
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*========== nav right =========*/}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="">
                <Link
                  to={`${
                    role == "doctor" ? "/nurse/profile/me" : "/profile/me"
                  }`}
                >
                  <figure className="w-[53px] h-[53px] rounded-full cursor-pointer">
                    <img
                      src={user.photo}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* <button
                onClick={logout}
                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
              >
                Logout
              </button> */}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
