import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../Usercontext';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function loginUser(event) {
        event.preventDefault();
        try {
            let { data } = await axios.post("/login", {
                email,
                password
            });
            alert("Login successful");
            setUser(data);
            setRedirect(true);
        } catch (e) {
            alert("Login unsuccessful")
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }
    return (
        <div className="grow flex flex-col justify-center">
            <div className="mb-24">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" action="" onSubmit={loginUser}>
                    <input type="email" name="email" id="email"
                        placeholder="youremail@gmail.com"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                    <input type="password" name="password" id="password"
                        placeholder="********"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    <button className="primary text-lg">Login</button>
                    <div className='text-center mt-2 text-gray-400'>Don't have account yet? <Link to={'/register'} className='underline text-primary'>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}