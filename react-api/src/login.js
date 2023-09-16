import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState({ email: '', password: '' });
    const [postData, setPostData] = useState('');
    const navigate = useNavigate();

    // const fetchUserData = () => {
    //     fetch("http://127.0.0.1:8000/api/auth")
    //         .then(response => response.json())
    //         .then(data => {
    //             setUsers(data);
    //             console.log(data);
    //         })
    //         .catch(error => console.error('Error:', error));
    // }

    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://127.0.0.1:8000/api/postData', {
                method: 'POST',
                body: JSON.stringify(name),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            setPostData(result);
            result === 1 ? navigate("/home") :
                navigate("/");
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row w-100 justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='text-center'>
                            <h1 className='text-center mb-4 text-uppercase fw-bold d-inline-flex fw-bold border-bottom border-primary border-4'>Login</h1>
                        </div>
                        <form onSubmit={handleSubmit} className='p-5 shadow rounded-4'>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput1" placeholder="name@example.com" value={name.email} onChange={e => setName({ ...name, email: e.target.value })} />
                                <label for="floatingInput1">Email</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingInput2" placeholder="name@example.com" value={name.password} onChange={e => setName({ ...name, password: e.target.value })} />
                                <label for="floatingInput2">Password</label>
                            </div>
                            <div className='d-flex align-items-center gap-2 mb-2'>
                                <p className='small'>Not reistered yet? <Link to="/register" className='text-decoration-none fw-semibold text-uppercase border-bottom border-2 border-dark'>Register</Link ></p>
                            </div>
                            <button type="submit" className="btn btn-primary px-5">Login</button>
                        </form>
                        {postData == "0" ?
                            <div className="alert alert-danger mt-3" role="alert">
                                Wrong Credientials!
                            </div> : ""
                        }
                        {/* <h3 className='mt-3'>Fetch Data</h3>
                        <ul className='list-unstyled mt-2'>
                            {users.map((user, i) => (
                                <li key={i}>{user.name}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div >
        </>

    );
}

export default Login;
