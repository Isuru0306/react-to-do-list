import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormModal from "./components/FormModal";

function App() {
  return (
    <>
      <FormModal show={true} modalHeading="Add Task">
        <h1>Hello</h1>
        <h1>World</h1>
      </FormModal>
      ;
    </>
  );
}

export default App;
