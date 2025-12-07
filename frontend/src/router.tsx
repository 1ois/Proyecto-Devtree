import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import ResgisterView from "./views/RegisterView";
import AuthLayot from "./layouts/AuthLayot";
import AppLayout from "./layouts/AppLayot";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HomeView from "./views/HomeView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";
export default function () {
    return (<BrowserRouter>
        <Routes>
            <Route element={<AuthLayot />}>
                // definimos las rutas hijas
                <Route path='/auth/login' element={<LoginView />} />
                <Route path='/auth/register' element={<ResgisterView />} />
            </Route>
            <Route path="/admin" element={<AppLayout />}>
                <Route index={true} element={<LinkTreeView />}></Route>
                <Route path='profile' element={<ProfileView />}></Route>
            </Route>
            <Route path="/" element={<HomeView />}> </Route>

            <Route path='/:handle' element={<AuthLayot />}>
                <Route element={<HandleView />} index={true} />

            </Route>
            <Route path="/404" element={<AuthLayot />}>
                <Route element={<NotFoundView />} index={true} />

            </Route>

        </Routes>

    </BrowserRouter>)
}


