import React, {Fragment} from 'react';
import './styles.css';
const Lineas = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                <h2 className="mt-4">Lineas</h2>
                </div>
                <table class="table table-hover mt-5">
                <thead>
                    <tr>
                        <th>Id.Linea</th>
                        <th>Id. Red</th>
                        <th>Longitud</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>56215424</td>
                        <td>2</td>
                        <td>90 M</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>12154312</td>
                        <td>1</td>
                        <td>50 M</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>32134124</td>
                        <td>4</td>
                        <td>85 M</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>42141672</td>
                        <td>2</td>
                        <td>60 M</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>13456312</td>
                        <td>3</td>
                        <td>30 M</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr> 
                    <tr>
                        <td>32790012</td>
                        <td>2</td>
                        <td>60 M</td>
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

export default Lineas