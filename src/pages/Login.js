import React from 'react'

const Login = () => {
    return (
        <div>
            <h3 className="text-center text-white pt-4">Login</h3>
            <div id="login">
                <div className="container">
                
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info pt-4">Login</h3>
                                    <div className="form-group">
                                        <label forhtml="usuario" className="text-info mt-2">Usuario:</label>
                                        <input type="text" name="usuario" id="usuario" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label forhtml="password" className="text-info">Clave:</label>
                                        <input type="password" name="password" id="clave" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-outline-secondary btn-block text-white" value="Submit"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login


