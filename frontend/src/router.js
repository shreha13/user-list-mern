import { createBrowserRouter } from "react-router-dom";
import UserDetail from "./views/UserDetail";
import User from "./views/User";

const router = createBrowserRouter([{
  path: '/',
  children: [
    {
      path: '/',
      element: <User />
    }, {
      path: '/:userId',
      element: <UserDetail />
    }
  ]
}])

export default router;