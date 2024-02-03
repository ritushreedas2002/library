import React, { useRef, useState } from "react";
import "./styles.css";
import {
  FiMenu,
  FiHome,
  FiSettings,
  FiPlusSquare,
  FiLock,
  FiBox,
  FiHeart,
} from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Test from "../Test";
import BookSearch from "../../utils/BookSearch";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    icon: <FiHome />,
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    items: ["Display", "Editor", "Theme", "Interface"],
  },
  {
    name: "Create",
    icon: <FiPlusSquare />,
    items: ["Article", "Document", "Report"],
  },
  {
    name: "Account",
    icon: <FiLock />,
    items: ["Dashboard", "Logout"],
  },
  {
    name: "Products",
    icon: <FiBox />,
  },
  {
    name: "Favourites",
    icon: <FiHeart />,
  },
  {
    name: "Logout",
    icon: <BiLogOut />,
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav, open }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    {!open && <span>{name}</span>}
    {hasSubNav && <FiChevronDown />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick, open }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <>
      {!open && (
        <div
          className={`sub-nav ${
            isSubNavOpen(item.name, item.items) ? "open" : ""
          }`}
          style={{
            height: !isSubNavOpen(item.name, item.items)
              ? 0
              : navRef.current?.clientHeight,
          }}
        >
          <div ref={navRef} className="sub-nav-inner">
            {item?.items.map((subItem) => (
              <NavButton
                key={subItem}
                onClick={handleClick}
                name={subItem}
                isActive={activeItem === subItem}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const Sidebar = ({ isOpen, toggleSidebar, onSignOut }) => {
  const [activeItem, setActiveItem] = useState("");
  //const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <div className=" ">
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
          <header className="sidebar-header">
            <button type="button" /*onClick={() => setIsOpen(!isOpen)}*/ onClick={toggleSidebar}>
              {!isOpen ? <MdOutlineCancel /> : <FiMenu />}
            </button>
            {!isOpen && <span>Admin</span>}
          </header>
          {menuItems.map((item) => (
            <div key={item.name}>
              {!item.items && (
                <NavButton
                  onClick={handleClick}
                  name={item.name}
                  icon={item.icon}
                  isActive={activeItem === item.name}
                  hasSubNav={!!item.items}
                  open={isOpen}
                />
              )}
              {item.name === "Logout" && (
                <button type="button" onClick={handleLogout}>
                  <Icon icon={item.icon} />
                  {!isOpen && <span>{item.name}</span>}
                </button>
              )}
              {item.name === "Logout" && (
                <button type="button" onClick={onSignOut}>
                  <Icon icon={item.icon} />
                  {!isOpen && <span>SignOut</span>}
                </button>
              )}
              {item.items && (
                <>
                  <NavButton
                    onClick={handleClick}
                    name={item.name}
                    icon={item.icon}
                    isActive={activeItem === item.name}
                    hasSubNav={!!item.items}
                    open={isOpen}
                  />
                  <SubMenu
                    activeItem={activeItem}
                    handleClick={handleClick}
                    item={item}
                    open={isOpen}
                  />
                </>
              )}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
};
export default Sidebar;