import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState({ name: '', email: '', password: '' });
    const [postData, setPostData] = useState('');
    const [success, setSuccess] = useState('');
    const [empty, setEmpty] = useState('');
    const [exist, setExist] = useState('');


    useEffect(() => {
        const clearMessages = () => {
            setEmpty('');
            setSuccess('');
            setExist('');
        };

        if (empty === '1' || success === '1' || exist === '1') {
            setTimeout(clearMessages, 3000);
        }
    }, [empty, success, exist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.name || !name.email) {
            setEmpty("1");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/regData', {
                method: 'POST',
                body: JSON.stringify(name),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setPostData(result);
            setName({ name: '', email: '', password: '' });
            result === 1 ? setSuccess("1") :
                setExist("1");
        }
        catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            <div className='container'>
                <div className='row w-100 justify-content-centesr'>
                    <div className='col-lg-8 mx-auto'>
                        <div className='text-center'>
                            <h1 className='text-center mb-4 text-uppercase d-inline-flex fw-bold border-bottom border-primary border-4'>Register</h1>
                        </div>
                        <form onSubmit={handleSubmit} className='p-5 shadow rounded-4'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={name.name} onChange={e => setName({ ...name, name: e.target.value })} />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={name.email} onChange={e => setName({ ...name, email: e.target.value })} />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com" value={name.password} onChange={e => setName({ ...name, password: e.target.value })} />
                                <label htmlFor="floatingInput">Password</label>
                            </div>
                            <div className='d-flex align-items-center gap-2 mb-2'>
                                <p className='small'>Already a user? <Link to="/" className='text-decoration-none fw-semibold text-uppercase border-bottom border-2 border-dark'>Login</Link ></p>
                            </div>
                            <button type="submit" className="btn btn-primary px-5">Submit</button>
                        </form>
                        {empty == "1" ?
                            <div className="alert alert-danger mt-3" role="alert">
                                Please fill in all fields
                            </div> : ""
                        }
                        {success == "1" ?
                            <div className="alert alert-success mt-3" role="alert">
                                User Created Successfully!
                            </div> : ""
                        }
                        {exist == "1" ?
                            <div className="alert alert-warning mt-3" role="alert">
                                User Already Exist!
                            </div> : ""
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
