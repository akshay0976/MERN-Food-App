import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3004/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }
        else {
            alert("Enter Valid Credentials")
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder="Enter the name" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} placeholder="Enter the Email" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} placeholder="Enter the password" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="geolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder="Click below for fetching address" />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>

    );
}

export default Signup;
