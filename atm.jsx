const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
       <p>Select an amount to {isDeposit? "deposit" : "withdraw"} in US dollars.</p>

      

      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value={isDeposit? "Deposit" : "Withdraw"} id="submit-input" disabled={!isValid}></input>
      {
        !isValid && <p className="error">Enter a valid amount</p>
      }
    </label>
  );
};

const Account = () => {
  const [atmMode, setAtmMode] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Your account balance is $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    const newDeposit = Number(event.target.value);
    if (newDeposit <= 0){
      setValidTransaction(false);
      return;
    }
    if ((atmMode == "Withdraw") && (newDeposit > totalState)){
      setValidTransaction(false);
      return;
    }
    setValidTransaction(true);
    setDeposit(newDeposit);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
   setAtmMode(event.target.value);
   switch (event.target.value){
     case "":
      break;
     case "Deposit":
      setIsDeposit(true);      
      break;
     case "Withdraw":
      setIsDeposit(false);
      break;
    default:
     break;
   }
  };

  return (
    <form onSubmit={handleSubmit}> 
      <h2 id="total">{status}</h2>
      <div style={{ whiteSpace: 'no-wrap', display: 'block'}}>
        <label>Select an action to continue
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" >
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Withdraw">Withdraw</option>
          </select>
        </label>
      </div>
      {
        atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      }

    </form >
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
