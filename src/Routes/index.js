import ProfileAdmin from "../components/Admin/ProfileAdmin";
import HomePage from "../components/HomePage";

export const routes = [
    {
        path: '/warehouse',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/Profile',
        page: ProfileAdmin,
        isShowHeader: false
    },
]