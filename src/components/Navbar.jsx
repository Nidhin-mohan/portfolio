import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10 flex justify-between items-center">
      <ul className="flex space-x-4">
        {["Home", "Projects", "Contact"].map((section) => (
          <li key={section}>
            <a
              href={`#${section.toLowerCase()}`}
              className="hover:text-blue-400 transition duration-300"
            >
              {section}
            </a>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
