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
import Test from "./Test";
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
    name:"Logout",
    icon:<BiLogOut/>
  }
];

// const NavHeader = ({ onClick }) => (
//   <header className="sidebar-header">
//     <button type="button">
//       <FiMenu />
//     </button>
//     <span>Admin</span>
//   </header>
// );

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav,open }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    {!open && (<span>{name}</span>)}
    {hasSubNav && <FiChevronDown />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick ,open}) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <>
    {!open && (
      <div
        className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
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
  )
};

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <>
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <header className="sidebar-header">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ?<MdOutlineCancel />:<FiMenu />  }
        </button>
        {!isOpen && (<span>Admin</span>)}
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
    <div className="ml-20">
    <Test/>
    </div>
    </>
  );
};
export default Sidebar;
