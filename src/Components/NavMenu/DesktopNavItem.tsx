import React from "react";

import { Link } from "react-router-dom";
import { NavMenuDataType } from "./NavMenuData";
import { useAuth } from "../../Context/Auth/AuthContextPovider";

type DesktopNavItemProps = {
  index: number;
  item: NavMenuDataType;
};

const DesktopNavItem = ({ index, item }: DesktopNavItemProps) => {
  const { logOut } = useAuth();

  const signOutCallback = () => {
    if (logOut) {
      logOut();
    }
  };

  return (
    <li
      key={index}
      className={item.cName}
      onClick={() => {
        return item?.logOut ? signOutCallback() : null;
      }}
    >
      <Link to={item.path}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  );
};

export default DesktopNavItem;
