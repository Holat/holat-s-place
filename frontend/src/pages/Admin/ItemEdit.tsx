import { useState } from "react";
import ItemForm from "./ItemForm";
import { ItemCreateType } from "../../types/types";

const placeHolder= {
    name: "",
    price: 0,
    cookTime: 0,
    imageUrl: "",
    desc: "",
    tags: ["Select..."],
    origins: ["Select..."]
}
const ItemEdit = ({ closeModal }: {closeModal: () => void}) => {
    const [defaultValues, setDefaultValues] = useState(placeHolder);

    return (
        <div className="modal">
            <ItemForm closeModal={closeModal} defaultValues={defaultValues}/>
            
        </div>
    )
}

export default ItemEdit;