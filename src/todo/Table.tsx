import ButtonCircle from "../components/ButtonCircle";

interface Props {
  headers?: string[];
  lists?: {
    no: number;
    to_do_desc: string;
    status: string;
    username: string;
    date: string;
    time: string;
  }[];
}

const Table = ({ headers, lists }: Props) => {
  return (
    <table className="table mb-4">
      <thead>
        <tr className="text-center">
          {headers?.map((columnName, index) => (
            <th scope="col" key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lists?.map((item, index) => (
          <tr className="text-center" key={item.no}>
            <th scope="row">{item.no}</th>
            <td>{item.to_do_desc}</td>
            <td>{item.status}</td>
            <td>{item.username}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>
              <div className="row">
                <div className="col-4 text-center">
                  <ButtonCircle title="Edit" icon="edit" color="btn-primary" />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Complete"
                    icon="complete"
                    color="btn-primary"
                  />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Delete"
                    icon="delete"
                    color="btn-danger"
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
