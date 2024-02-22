import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(event) {
        event.preventDefault();
        try {
            let res = await axios.post("/register", {
                name,
                email,
                password
            });
            alert('Registration Successful. Now you can log in')
            setName("")
            setEmail("")
            setPassword("")
        } catch (e) {
            if (e.code = 11000) {
                alert("Email already exists");
            } else {
                alert('Registrtion failed. Please try again later')
            }

        }

    }
    return (
        <div className="grow flex flex-col justify-center">
            <div className="mb-24">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" action="" onSubmit={registerUser}>
                    <input type="text" name="name" id="name"
                        placeholder='John Doe'
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                        }} />
                    <input type="email" name="email" id="email"
                        placeholder="youremail@gmail.com"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                    <input type="password" name="password" id="password"
                        placeholder="********"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    <button className="primary text-lg">Register</button>
                    <div className='text-center mt-2 text-gray-400'>Already have an account? <Link to={'/login'} className='underline text-primary'>Login</Link></div>
                </form>
            </div>
        </div>
    )
}