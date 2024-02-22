import { useContext, useState } from "react"
import { UserContext } from "../Usercontext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }


    if (subpage === undefined) {
        subpage = 'profile'
    }

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setRedirect("/");
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mt-10 flex flex-col justify-center items-center gap-4">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-xs">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}


        </div>


    )
}