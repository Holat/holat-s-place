import { useState } from "react";
import useFood from "../../hooks/useFood";
import Form from "./Form";
import { Price } from "../../components";
import { ItemCreateType } from "../../types/types";

const placeHolder = {
  name: "",
  price: 0,
  cookTime: 0,
  imageUrl: "",
  desc: "",
};
const ItemEdit = ({ closeModal }: { closeModal: () => void }) => {
  const { foods } = useFood();
  const [defaultValues, setDefaultValues] =
    useState<ItemCreateType>(placeHolder);
  const mapData = (data: string[]) =>
    data.map((item) => ({ value: item, label: item }));

  return (
    <div className="flexCont modal">
      <div className="itemEdit">
        <Form defaultValues={defaultValues} formType="U" />
        <ul>
          <div className="lh">
            <h4>Edit Items</h4>
            <button onClick={closeModal}>close</button>
          </div>
          {foods.map((item) => {
            const mappedTags = mapData(item.tags);
            const mappedOrigins = mapData(item.origins);
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <div className="det">
                  <div className="hed">
                    <h4>{item.name}</h4>
                    <Price price={item.price} />
                  </div>
                  <button
                    onClick={() =>
                      setDefaultValues({
                        ...item,
                        tags: mappedTags,
                        origins: mappedOrigins,
                        desc: item.desc || " ",
                      })
                    }
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ItemEdit;
