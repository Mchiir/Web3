import { useEffect, useState } from "react";
import {
  initWeb3,
  getMessage,
  setMessage,
  divide,
  multiply,
  subtract,
  add,
} from "./utils/web3";

function App() {
  const [message, setMsg] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      await initWeb3();
      const msg = await getMessage();
      setMsg(msg);
    }
    fetchMessage();
  }, []);

  const handleUpdateMessage = async () => {
    await setMessage(newMessage);
    setMsg(newMessage);
  };

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleAdd = async () => {
    try {
      const sum = await add(num1, num2);
      setResult(Number(sum));
      setError("");
    } catch (err) {
      setError("Error performing addition");
      console.error(err);
    }
  };

  const handleSubtract = async () => {
    try {
      const difference = await subtract(num1, num2);
      setResult(Number(difference));
      setError("");
    } catch (err) {
      setError(
        "Error performing subtraction. First number must be greater than or equal to second number."
      );
      console.error(err);
    }
  };

  const handleMultiply = async () => {
    try {
      const product = await multiply(num1, num2);
      setResult(Number(product));
      setError("");
    } catch (err) {
      setError("Error performing multiplication");
      console.error(err);
    }
  };

  const handleDivide = async () => {
    try {
      if (num2 === 0) {
        throw new Error("Cannot divide by zero");
      }
      const quotient = await divide(num1, num2);
      setResult(Number(quotient));
      setError("");
    } catch (err) {
      setError("Error performing division. Cannot divide by zero.");
      console.error(err);
    }
  };

  return (
    <div className="dapp-container">
      <h1 className="dapp-title">H3ll0</h1>
      <div className="message-display">
        <p className="message-text">Current Message: {message}</p>
      </div>
      <input
        className="input-field"
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter new message"
      />
      <button className="update-button" onClick={handleUpdateMessage}>
        Update Message
      </button>
      <div className="calculator-container">
        <h1>Calculator</h1>
        <div className="calculator-inputs">
          <input
            className="input-field"
            type="number"
            value={num1}
            onChange={(e) => setNum1(Number(e.target.value))}
            placeholder="Enter first number"
            aria-label="First number input"
          />
          <input
            className="input-field"
            type="number"
            value={num2}
            onChange={(e) => setNum2(Number(e.target.value))}
            placeholder="Enter second number"
            aria-label="Second number input"
          />
        </div>
        <div className="calculator-buttons">
          <button
            className="calc-button"
            onClick={handleAdd}
            aria-label="Add numbers"
          >
            Add
          </button>
          <button
            className="calc-button"
            onClick={handleSubtract}
            aria-label="Subtract numbers"
          >
            Subtract
          </button>
          <button
            className="calc-button"
            onClick={handleMultiply}
            aria-label="Multiply numbers"
          >
            Multiply
          </button>
          <button
            className="calc-button"
            onClick={handleDivide}
            aria-label="Divide numbers"
          >
            Divide
          </button>
        </div>
        {result !== null && <p className="result-text">Result: {result}</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}

export default App;
