import categoriesAPI from "api/categoriesApi";
import React, { useEffect, useState } from "react";
import { DropdownButton, NavDropdown } from "react-bootstrap";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { topCategory } from "store/userSlice";
export default function CategoriesMenu() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { success, categories } = await categoriesAPI.getTree();
      success && setCategories(categories);
      dispatch(topCategory(categories));
    })();
  }, []);

  return (
    <DropdownButton className="category-dropdown" title="Categories" id="dropdown-autoclose-true">
      {categories.map((category) => {
        if (category.child.length === 0) {
          return (
            <NavDropdown.Item key={category._id}>
              <Link style={{ color: "#000" }} to={`/web?category=${category._id}`}>
                {category.name}
              </Link>
            </NavDropdown.Item>
          );
        }

        return (
          <DropdownSubmenu href={`/web?category=${category._id}`} key={category._id} title={category.name}>
            {category.child.map((subCategory) => (
              <NavDropdown.Item key={subCategory._id}>
                <Link style={{ color: "#000" }} to={`/web?category=${subCategory._id}`}>
                  {subCategory.name}
                </Link>
              </NavDropdown.Item>
            ))}
          </DropdownSubmenu>
        );
      })}
    </DropdownButton>
  );
}
