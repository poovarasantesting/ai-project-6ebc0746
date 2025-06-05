import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const { toast } = useToast();

  const clearDisplay = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setDisplay(String(result));
      setStoredValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        if (secondValue === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive",
          });
          return 0;
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (storedValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(storedValue, inputValue, operator);
    
    setDisplay(String(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-xs">
      <div className="bg-gray-700 p-4 rounded mb-4 text-right">
        <div className="text-gray-300 text-sm h-6">
          {storedValue !== null && `${storedValue} ${operator}`}
        </div>
        <div className="text-white text-3xl font-medium overflow-x-auto">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button 
          onClick={clearDisplay}
          className="bg-gray-500 hover:bg-gray-600"
        >
          AC
        </Button>
        <Button 
          onClick={toggleSign}
          className="bg-gray-500 hover:bg-gray-600"
        >
          +/-
        </Button>
        <Button 
          onClick={handlePercentage}
          className="bg-gray-500 hover:bg-gray-600"
        >
          %
        </Button>
        <Button 
          onClick={() => handleOperator("÷")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          ÷
        </Button>

        <Button onClick={() => handleDigit("7")}>7</Button>
        <Button onClick={() => handleDigit("8")}>8</Button>
        <Button onClick={() => handleDigit("9")}>9</Button>
        <Button 
          onClick={() => handleOperator("×")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          ×
        </Button>

        <Button onClick={() => handleDigit("4")}>4</Button>
        <Button onClick={() => handleDigit("5")}>5</Button>
        <Button onClick={() => handleDigit("6")}>6</Button>
        <Button 
          onClick={() => handleOperator("-")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          -
        </Button>

        <Button onClick={() => handleDigit("1")}>1</Button>
        <Button onClick={() => handleDigit("2")}>2</Button>
        <Button onClick={() => handleDigit("3")}>3</Button>
        <Button 
          onClick={() => handleOperator("+")}
          className="bg-orange-500 hover:bg-orange-600"
        >
          +
        </Button>

        <Button 
          onClick={() => handleDigit("0")}
          className="col-span-2"
        >
          0
        </Button>
        <Button onClick={handleDecimal}>.</Button>
        <Button 
          onClick={handleEquals}
          className="bg-orange-500 hover:bg-orange-600"
        >
          =
        </Button>
      </div>
    </div>
  );
}