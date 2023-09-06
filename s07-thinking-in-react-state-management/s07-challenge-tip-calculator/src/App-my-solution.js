import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [tipCustomer, setTipCustomer] = useState("dissatisfied");
  const [tipFriend, setTipFriend] = useState("dissatisfied");

  function handleBill(value) {
    setBill(() => value);
  }

  function handleTipCustomer(value) {
    setTipCustomer(() => value);
  }

  function handleTipFriend(value) {
    setTipFriend(() => value);
  }

  function handleReset() {
    setBill(0);
    setTipCustomer("dissatisfied");
    setTipFriend("dissatisfied");
  }

  return (
    <div style={{ margin: "10px", fontSize: "16px" }}>
      <form>
        <Bill name="bill" forId="bill" onBillChange={handleBill} bill={bill} />

        <SelectTip
          name={"customer satisfaction"}
          forId={"customer"}
          onTipSelect={handleTipCustomer}
          tipSelection={tipCustomer}
        >
          How did you like the service?
        </SelectTip>

        <SelectTip
          name={"friend satisfaction"}
          forId={"friend"}
          onTipSelect={handleTipFriend}
          tipSelection={tipFriend}
        >
          How did your friend like the service?
        </SelectTip>

        {/* {bill !== 0 ? (
          <Result bill={bill} tipCustomer={tipCustomer} tipFriend={tipFriend} />
        ) : (
          ""
        )} */}

        {bill !== 0 && (
          <Result
            bill={bill}
            tipCustomer={tipCustomer}
            tipFriend={tipFriend}
            onResetClick={handleReset}
          />
        )}
      </form>
    </div>
  );
}

function Result({ bill, tipCustomer, tipFriend, onResetClick }) {
  function getTipPercentage(tipValue) {
    if (tipValue === "dissatisfied") return 0;
    if (tipValue === "okay") return 5;
    if (tipValue === "good") return 10;
    if (tipValue === "amazing") return 20;
  }

  const totalTip =
    bill *
    ((getTipPercentage(tipCustomer) + getTipPercentage(tipFriend)) / 200);

  return (
    <div>
      <h1>
        You pay ${Number(bill) + totalTip} (${bill} + ${totalTip} tip)
      </h1>
      <button onClick={onResetClick}>Reset</button>
    </div>
  );
}

function Bill({ name, forId, onBillChange, bill }) {
  return (
    <div>
      <label htmlFor={forId}>How much was the bill?</label>
      <input
        name={name}
        id={forId}
        type="text"
        value={bill}
        style={{ marginLeft: "15px" }}
        onChange={(e) => onBillChange(e.target.value)}
      />
    </div>
  );
}

function SelectTip({ name, forId, onTipSelect, tipSelection, children }) {
  return (
    <div>
      <label htmlFor={forId}>{children}</label>
      <select
        id={forId}
        name={name}
        style={{ marginLeft: "15px" }}
        value={tipSelection}
        onChange={(e) => onTipSelect(e.target.value)}
      >
        <option value="dissatisfied">Dissatisfied (0%)</option>
        <option value="okay">It was okay (5%)</option>
        <option value="good">It was good (10%)</option>
        <option value="amazing">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

export default App;
