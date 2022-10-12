import { Outlet } from "@remix-run/react";

const AdminCategories = () => {
  return (
    <>
      <article className="flex flex-col gap-4 rounded-md border border-slate-100 bg-white px-4 py-3 lg:px-6 lg:py-4">
        <Outlet />
      </article>
    </>
  );
};

export default AdminCategories;
