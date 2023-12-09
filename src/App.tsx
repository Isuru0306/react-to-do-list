import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import Button from "./components/Button";
import FormInput from "./components/FormInput";
import Table from "./todo/ToDoTable";
import ToDoAddForm from "./todo/ToDoForm";
import FormSelect from "./components/FormSelect";
import FormCheckBox from "./components/FormCheckBox";
import FormLabel from "./components/FormLabel";

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [item, setItem] = useState({});
  const [searchValue, setSearchValue] = useState({});
  const [searchFilter, setSearchFilter] = useState("All Task");
  const [fetchDummyData, setFetchDummyData] = useState(false);

  const showCreateListModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  const handleSaveModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  const tableAction = (item: any, action: string) => {
    if (action === "edit") {
      setItem(item);
      setShowEditModal(true);
    }
  };

  return (
    <div>
      <ToDoAddForm
        show={showCreateModal}
        modalHeading={"Add To Do List"}
        onHide={handleCloseModal}
        onSave={handleSaveModal}
        isFetchData={fetchDummyData}
      />
      <ToDoAddForm
        show={showEditModal}
        modalHeading={"Edit To Do List"}
        list={item}
        action={"EDIT"}
        onHide={handleCloseModal}
        onSave={handleSaveModal}
        isFetchData={fetchDummyData}
      />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 col-xl-10">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h2 className="text-center my-3 pb-3">To Do List</h2>
                  <div className="row">
                    <div className="col-12 form-check form-check-inline">
                      {!fetchDummyData ? (
                        <div>
                          <FormCheckBox
                            onChange={(value) => {
                              setFetchDummyData(value);
                            }}
                          />
                          <FormLabel text="Fetch dummy data" />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        text="Create Task"
                        color="btn btn-primary"
                        onClick={showCreateListModal}
                      />
                    </div>
                  </div>

                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <div className="col-10 col-lg-auto">
                      <FormSelect
                        options={[
                          "All Task",
                          "Not Started Task",
                          "In Progress Task",
                          "Completed Task",
                        ]}
                        onChange={(value) => setSearchFilter(value)}
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-outline">
                        <FormInput
                          placeholder="Search"
                          onChange={(value) => setSearchValue(value)}
                        />
                      </div>
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
                    searchValue={{
                      search: searchValue,
                      filter: searchFilter,
                    }}
                    onClick={(item, action) => {
                      tableAction(item, action);
                    }}
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
