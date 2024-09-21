import { Title } from "../../components";
import Form from "./Form";
import { closeIcon } from "../../assets/icons";

const ItemForm = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="flexCont modal">
      <div className="createForm">
        <div className="header">
          <Title title="Create Item" fontSize="24px" fontWeight={600} />
          <button onClick={closeModal}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <Form formType="C" />
      </div>
    </div>
  );
};

export default ItemForm;
