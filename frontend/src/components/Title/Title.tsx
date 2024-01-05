export default function Title({
  title,
  fontSize,
  fontWeight,
  opacity,
}: {
  title?: string;
  fontSize?: string | "16px";
  fontWeight?: number | 600;
  opacity?: number;
}) {
  return (
    <div
      className="title"
      style={{
        fontWeight,
        fontSize,
        opacity,
      }}
    >
      {title}
    </div>
  );
}
