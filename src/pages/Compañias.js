import React, {Fragment} from 'react';
import './styles.css';
const Redes = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                <h2 className="mt-4">Redes</h2>
                </div>
                <table class="table table-hover mt-5">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Id.Red</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>EDEN</td>
                        <td>1</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>AES</td>
                        <td>2</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>TRANSBA</td>
                        <td>3</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>EDENOR</td>
                        <td>4</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>      
                </tbody>
            </table>
            </div>   
        </Fragment>
    );
}

export default Redes