import React from "react";

const Table = ({
    response,
    className,
    thead,
    handleEditMode,
    handleDeleteMode,
    name,
    handleSort,

}) => {
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
    return (
        <div className={className}>
            <div className="card border border-dark mt-5">
                <div className="card-header d-flex justify-content-start">
                    <h3>{name}</h3>
                    
                </div>
                <div className="table-responsive">
                    <table id="zero_config" className="table  no-wrap  ">
                        <thead>
                            <tr>
                                {thead.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((data) => (
                                <tr key={data.id}>
                                    <td>{truncate(data.title, 20)}</td>
                                    <td>{truncate(data.description, 20)}</td>
                                    <td>{data.createdAt}</td>
                                    <td className="d-flex">
                                        <div
                                            className="btn btn-sm"
                                            title="Edit"
                                            onClick={ ()=>  handleEditMode( data.id)}
                                        >
                                            <i className="fas fa-pencil-alt text-success"></i>
                                        </div>
                                        {data.status === 1 ? null : (
                                            <div
                                                className="btn btn-sm"
                                                title="Delete"
                                                onClick={() => handleDeleteMode(data.id)}
                                            >
                                                <i className="far fa-trash-alt text-danger"></i>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
