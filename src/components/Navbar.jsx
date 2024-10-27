import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10">
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
    </nav>
  );
};

export default Navbar;
