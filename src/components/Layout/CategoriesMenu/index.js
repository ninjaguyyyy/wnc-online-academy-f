import React, { useEffect } from 'react';
import { DropdownButton, NavDropdown } from 'react-bootstrap';
import { DropdownSubmenu } from 'react-bootstrap-submenu';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesTree } from 'store/thunks';

export default function CategoriesMenu() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.tree);

  useEffect(() => {
    dispatch(fetchCategoriesTree());
  }, [dispatch]);

  return (
    <DropdownButton className="category-dropdown" title="Categories" id="dropdown-autoclose-true">
      {categories.map((category) => {
        if (category.child.length === 0) {
          return (
            <NavDropdown.Item key={category._id}>
              <Link style={{ color: '#000' }} to={`/web?category=${category._id}`}>
                {category.name}
              </Link>
            </NavDropdown.Item>
          );
        }

        return (
          <DropdownSubmenu href={`/web?category=${category._id}`} key={category._id} title={category.name}>
            {category.child.map((subCategory) => (
              <NavDropdown.Item key={subCategory._id}>
                <Link style={{ color: '#000' }} to={`/web?category=${subCategory._id}`}>
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
