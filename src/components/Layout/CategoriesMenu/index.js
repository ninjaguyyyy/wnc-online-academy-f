import categoriesAPI from "api/categoriesApi";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

export default function CategoriesMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const { success, categories } = await categoriesAPI.getTree();
      success && setCategories(categories);
    })();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <NavDropdownMenu title="Categories" id="collasible-nav-dropdown">
      {categories.map((category) => {
        if (category.child.length === 0) {
          return (
            <NavDropdown.Item href={`/web?category=${category._id}`}>
              {category.name}
            </NavDropdown.Item>
          );
        }

        return (
          <DropdownSubmenu
            href={`/web?category=${category._id}`}
            title={category.name}
          >
            {category.child.map((subCategory) => (
              <NavDropdown.Item href={`/web?category=${category._id}`}>
                {subCategory.name}
              </NavDropdown.Item>
            ))}
          </DropdownSubmenu>
        );
      })}
    </NavDropdownMenu>
  );
}
