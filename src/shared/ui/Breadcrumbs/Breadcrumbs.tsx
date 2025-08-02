import type React from "react";
import style from "./style.module.scss";
import { Link } from "react-router";

export type ItemType = {
  href: string;
  label: string;
};

export type PropsType = {
  className?: string;
  items?: ItemType[];
};

const Breadcrumbs: React.FC<PropsType> = ({ className, items = [] }) => {
  return (
    <div className={`${style.breadcrumbs} ${className}`}>
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.href}
            className={`p-body-responsive ${style.link} ${
              items.length - 1 === index && style.active
            }`}
          >
            {item.label} {items.length - 1 !== index && "/"}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
