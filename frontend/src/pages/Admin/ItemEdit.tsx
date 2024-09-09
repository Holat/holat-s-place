import { useState } from "react";
import useFood from "../../hooks/useFood";
import Form from "./Form";
import { Price } from "../../components";

const placeHolder= {
    name: "",
    price: 0,
    cookTime: 0,
    imageUrl: "",
    desc: "",
    tags:  [{ value: "", label: "" }],
    origins:  [{ value: "", label: "" }],
}
const ItemEdit = ({ closeModal }: {closeModal: () => void}) => {
    const { foods } = useFood();
    const [defaultValues, setDefaultValues] = useState(placeHolder);
    const mapData = (data: string[]) => data.map((item) => ({ value: item, label: item}));

    return (
        <div className="modal">
            <div className="itemEdit">
                <Form  defaultValues={defaultValues} formType="U"/>
                <ul>
                    { foods.map((item) => {
                        const mappedTags = mapData(item.tags);
                        const mappedOrigins = mapData(item.origins);
                        return (<li key={item.id}>
                            <div>
                                <h4>{item.name}</h4>
                                <Price price={item.price}/>
                                
                            </div>
                            <button onClick={() => setDefaultValues({ ...item, tags: mappedTags, origins: mappedOrigins, desc: item.desc || " " })}>Edit</button>
                        </li>)
                        }        
                    )}
                </ul>
            </div>
            <button onClick={closeModal}>close</button>
        </div>
    )
}

export default ItemEdit;