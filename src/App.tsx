import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";

import Button from "./components/Button";
import FormInput from "./components/FormInput";
import Table from "./todo/Table";
import ToDoAddForm from "./todo/ToDoAddForm";
function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const showCreateListModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSaveModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div>
      <ToDoAddForm
        show={showCreateModal}
        modalHeading={"Add To Do List"}
        onHide={handleCloseModal}
        onSave={handleSaveModal}
      />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 col-xl-10">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h2 className="text-center my-3 pb-3">To Do List</h2>

                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <div className="col-12">
                      <div className="form-outline">
                        <FormInput placeholder="Search" />
                      </div>
                    </div>

                    <div className="col-10 col-lg-auto">
                      <Button
                        text="Create Task"
                        color="btn btn-primary"
                        onClick={showCreateListModal}
                      />
                    </div>
                  </form>

                  <Table
                    headers={[
                      "No.",
                      "Todo item",
                      "Status",
                      "Username",
                      "Date",
                      "Time",
                      "Actions",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
