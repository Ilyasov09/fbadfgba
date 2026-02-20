import { createBrowserRouter, Outlet } from "react-router";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Chat } from "./screens/Chat";
import { Settings } from "./screens/Settings";
import { MobileFrame } from "./components/MobileFrame";

function Root() {
  return (
    <MobileFrame>
      <Outlet />
    </MobileFrame>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "chat",
        Component: Chat,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);
