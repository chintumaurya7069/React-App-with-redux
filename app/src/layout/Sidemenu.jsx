import { NavLink } from "react-router-dom";
import { routes } from "./routes";

const Sidemenu = ({ setToggle, setIsFixed }) => {
  return (
    <aside
      id="layout-menu"
      className=" top-0 left-0 w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFixed((prev) => !prev);
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-thumbtack" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setToggle(false);
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-times" />
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="flex flex-col space-y-1 px-2">
        {routes?.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={(e) => {
                e.stopPropagation();
                setToggle(false);
              }}
            >
              <i className="fas fa-circle text-xs" />
              <span data-i18n={item.name}>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidemenu;

