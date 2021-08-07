import categoriesAPI from "api/categoriesApi";
import React, { useEffect, useState } from "react";
import { NavDropdown, Dropdown, DropdownButton } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { Link } from "react-router-dom";

export default function CategoriesMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const { success, categories } = await categoriesAPI.getTree();
      success && setCategories(categories);
    })();
  }, []);

  return (
    <NavDropdownMenu title="Categories" id="dropdown-autoclose-true">
      {categories.map((category) => {
        if (category.child.length === 0) {
          return (
            <NavDropdown.Item href="javascript:void(0)">
              <Link to={`/web?category=${category._id}`}>{category.name}</Link>
            </NavDropdown.Item>
          );
        }

        return (
          <DropdownSubmenu href={`/web?category=${category._id}`} title={category.name}>
            {category.child.map((subCategory) => (
              <NavDropdown.Item>
                <Link to={`/web?category=${subCategory._id}`}>{subCategory.name}</Link>
              </NavDropdown.Item>
            ))}
          </DropdownSubmenu>
        );
      })}
    </NavDropdownMenu>
  );
}
