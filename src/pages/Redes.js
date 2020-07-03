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
                        <th>Id. Red</th>
                        <th>Estación</th>
                        <th>Compañías</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>32</td>
                        <td>EDEN</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>15</td>
                        <td>AES</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>12</td>
                        <td>TRANSBA</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>23</td>
                        <td>EDENOR</td>
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