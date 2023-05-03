
const generateBankAccountNumber = () => {
  const sequentialDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return Number(`${sequentialDigits}${randomDigits}`);
};

export default generateBankAccountNumber
