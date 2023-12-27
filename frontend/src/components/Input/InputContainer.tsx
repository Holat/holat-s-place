// import classes from "./inputContainer.module.css";

const InputContainer = ({
  label,
  bgColor,
  children,
}: {
  label: string;
  bgColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="inputContainer">
      <label className="label">{label}</label>
      <div className="content">{children}</div>
    </div>
  );
};

export default InputContainer;
