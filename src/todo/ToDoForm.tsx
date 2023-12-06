const ToDoForm = () => {
    return (
        <form>
            <div className="row mb-4">
                <div className="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example1" className="form-control" />
                        <label className="form-label">First name</label>
                    </div>
                </div>

                <div className="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example2" className="form-control" />
                        <label className="form-label">Last name</label>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example1" className="form-control" />
                        <label className="form-label">First name</label>
                    </div>
                </div>

                <div className="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example2" className="form-control" />
                        <label className="form-label">Last name</label>
                    </div>
                </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-4">
                <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example33"
                    checked
                />
                <label className="form-check-label">Subscribe to our newsletter</label>
            </div>
        </form>
    );
};

export default ToDoForm;
