import Auth from "../pages/Auth";
import Home from "../pages/Home";
import SignInSide from "../pages/SignIn";


export const publicRoutes = [
    {
        id: "hellorewd",
        path: "/",
        Component: Auth,
        children: [{
            id: "1",
            path: "/login",
            Component: SignInSide
        }]
    },
];

export const privateRoutes = [
    {
        id: 1,
        path: "/home",
        component: Home,
    },
];
