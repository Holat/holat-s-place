import { Title } from "../../components";
import Form from "./Form";


const ItemForm = ({ closeModal } : {closeModal: () => void}) => {
  return (
    <div className="modal">
      <div className="createForm">
        <div className="header">
          <Title title="Create Item" fontSize="24px" fontWeight={600} />
          <button onClick={closeModal}>
            <img src="/icons/close.svg" alt="close" />
          </button>
        </div>
        <Form formType="C"/>
      </div>
    </div>
  );
};

export default ItemForm;
