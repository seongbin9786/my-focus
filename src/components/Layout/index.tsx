import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="bg flex h-screen w-screen flex-row">
      <div className="w-full bg-layer-1">
        <Outlet />
      </div>
    </div>
  );
};
