import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditModalPending = ({
    isOpen,
    toggle,
    className,
    externalCloseBtn,
    errorMsgName,
    handleChange,
    title,
    onClick,
    processState,
    description,
    checked,
    onChangeSwitch,
    status,
}) => {
    return (
        <div className="add-payment">
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                className={className}
                external={externalCloseBtn}
            >
                <ModalHeader>Edit To-Do-List</ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <div className="form-group">
                                <label className="control-label">Title</label>
                                <input
                                    autoFocus
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    value={title}
                                />
                              
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label className="control-label">Description</label>
                                <textarea
                                    autoFocus
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    placeholder="Deskripsi"
                                    onChange={handleChange}
                                    value={description}
                                />
                                
                            </div>
                        </div>

                        <div>
                            <label className="control-label">Status</label>
                            <div class="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitch1"
                                    name="status"
                                    value={"status"}
                                    checked={checked}
                                    onChange={onChangeSwitch}
                                />
                                {checked ? (
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customSwitch1"
                                    >
                                        Finish
                                    </label>
                                ) : (
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customSwitch1"
                                    >
                                        On progress!
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/*/row*/}
                </ModalBody>
                <ModalFooter>
                    <div className="float-right">
                        <div className="form-actions">
                            <button type="button" className="btn btn-danger" onClick={toggle}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-success ml-3"
                                onClick={onClick}
                                disabled={processState}
                            >
                                {" "}
                                <i className="fa fa-check" /> Save
                            </button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditModalPending;
