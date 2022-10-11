import { Link, Outlet, useLocation } from "@remix-run/react";
import React from "react";
import {
  ListBulletIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const menus = [
  {
    label: "Home",
    route: "/admin",
    icon: <HomeIcon className="w-8" />,
  },
  {
    label: "Items",
    route: "/admin/items",
    icon: <ClipboardDocumentListIcon className="w-8" />,
  },
  {
    label: "Categories",
    route: "/admin/categories",
    icon: <ListBulletIcon className="w-8" />,
  },
];

const RouteItem = (props: {
  label: string;
  route: string;
  icon: JSX.Element;
}) => {
  const location = useLocation();

  return (
    <li
      className={`relative isolate lg:w-full ${
        location.pathname === props.route
          ? "before:absolute before:-left-4 before:-right-4 before:-top-2 before:bottom-6 before:-z-10 before:bg-slate-50 after:absolute after:left-0 after:right-0 after:top-0 after:-z-10 after:h-14 after:rounded-b-3xl after:bg-slate-50 lg:before:left-4 lg:before:-right-6 lg:before:-top-6 lg:before:-bottom-6 lg:after:-right-6 lg:after:top-0 lg:after:bottom-0 lg:after:-left-4 lg:after:h-auto lg:after:rounded-l-full"
          : ""
      }`}
    >
      <Link
        to={props.route}
        className={`flex flex-col items-center justify-center px-4 lg:h-10 lg:flex-row lg:justify-start lg:gap-2 lg:px-0 ${
          location.pathname === props.route
            ? "font-bold text-blue-600 before:absolute before:-left-4 before:h-16 before:w-4 before:rounded-tr-full before:bg-blue-400 after:absolute after:-right-4 after:h-16 after:w-4 after:rounded-tl-full after:bg-blue-400 lg:before:-right-6 lg:before:-left-6 lg:before:-top-6 lg:before:h-6 lg:before:w-auto lg:before:rounded-tr-none lg:before:rounded-br-full lg:after:-bottom-6 lg:after:-right-6 lg:after:-left-6 lg:after:h-6 lg:after:w-auto lg:after:rounded-tl-none lg:after:rounded-tr-full"
            : "font-medium text-white"
        }`}
      >
        <span className="">{props.icon}</span>
        <span className="text-xs tracking-wider lg:text-base">
          {props.label}
        </span>
      </Link>
    </li>
  );
};

const AdminLayout = () => {
  return (
    <div className="isolate flex h-screen flex-col-reverse items-stretch lg:flex-row">
      <aside className="grow-0 basis-16 bg-blue-400 lg:h-auto lg:basis-64 xl:basis-72">
        <nav className="fixed inset-x-0 bottom-0 z-10 h-16 flex-col bg-inherit text-white -shadow-xl lg:static lg:h-full lg:shadow-none">
          <section className="hidden px-4 py-4 lg:block lg:px-6">
            <Link to="" className="text-xl font-bold tracking-widest">
              Menu BPSC
            </Link>
          </section>

          <section className="h-full px-4 lg:h-auto lg:py-4 lg:px-6">
            <ul className="flex h-full items-center justify-center gap-6 lg:flex-col lg:items-stretch lg:justify-start">
              {menus.map((menu) => (
                <RouteItem key={menu.route} {...menu} />
              ))}
            </ul>
          </section>
        </nav>
      </aside>
      <main className="relative flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 py-4 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
