import React, {Fragment} from 'react';
import './styles.css';
const Subestaciones = () => {

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                <h2 className="mt-4">Subestaciones</h2>
                </div>
                <table class="table table-hover mt-5">
                <thead>
                    <tr>
                        <th>Id.Subestación</th>
                        <th>Id.Linea</th>
                        <th>Cod. Postal</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>56215424</td>
                        <td>S2900</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>12154312</td>
                        <td>S2919</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>32134124</td>
                        <td>S2915</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>42141672</td>
                        <td>B1900</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>13456312</td>
                        <td>B7600</td>
                        <td className="text-center">
                            <a class="add" title="Add" data-toggle="tooltip" href="#"><i class="material-icons md-light">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" href="#"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" href="#"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr> 
                    <tr>
                        <td>6</td>
                        <td>32790012</td>
                        <td>S2901</td>
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

export default Subestaciones