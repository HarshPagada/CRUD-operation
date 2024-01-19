import React, { useState } from 'react'
import Gps from './Gps';
import Thank from './Thank';

export default function Form() {

    const [submitted, setsubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setsubmitted(true)
    }

    return (
        <>
            <div className='container my-4'>
                <Gps />
            </div>

            <div className='container my-4'>
                <h1 className='my-4'>Contact Us</h1>
                <form className="row g-3" id='row'>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Enter yourEmail</label>
                        <input type="email" autoComplete="current-input" className="form-control" id="inputEmail4" placeholder='admin@gmail.com' />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <textarea type="text" className="form-control" id="inputAddress" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="complain" className="form-label">Complain</label>
                        <textarea type="text" className="form-control" id="complain" />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
                {submitted && <Thank />}
            </div>

        </>
    )

}