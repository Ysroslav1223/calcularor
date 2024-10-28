import { useState } from "react";
import styles from "./app.modules.css";

const App = () => {
  const [display, setDisplay] = useState("");
  const [currentValue, setCurrentValue] = useState();
  const buttons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const pressClick = (value) => {
    if (currentValue && !isNaN(value)) {
      setDisplay(value);
      setCurrentValue(false);
    } else {
      correctInput(value);
    }
  };
  const correctInput = (value) => {
    if (display === "0" && value === "0") {
      return;
    }

    const lastChar = display.slice(-1);

    if (lastChar === "+" || lastChar === "-") {
      if (value === "0") {
        return;
      }
    }
    setDisplay(display === "0" ? value : display + value);
  };

  const firstOperation = (operation) => {
    if (display && !currentValue) {
      setDisplay(display + operation);
    }
  };

  const hadleEqual = () => {
    try {
      const result = new Function(`return ${display}`)();
      setDisplay(result.toString());
      setCurrentValue(true);
    } catch (error) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("");
    setCurrentValue(false);
  };

  return (
    <div className={styles.App}>
      <div className={`${styles.display} ${currentValue ? styles.result : ""}`}>
        {display || "0"}
      </div>
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => pressClick(button)}
            className={styles.button}
          >
            {button}
          </button>
        ))}
        <button onClick={() => firstOperation("+")} className={styles.button}>
          +
        </button>
        <button onClick={() => firstOperation("-")}>-</button>
        <button onClick={hadleEqual} className={styles.button}>
          =
        </button>
        <button onClick={clear} className={styles.button}>
          C
        </button>
      </div>
    </div>
  );
};

export default App;
