export default function generateTransactionRef(length: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const dateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const randomComplexNumber = Array.from({ length: 16 }, () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return chars.charAt(Math.floor(Math.random() * length));
  }).join("");
  const result = `${randomComplexNumber}${dateTimeString}`;
  return `flw_tx_ref_${result}`;
}
