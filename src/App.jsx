import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import "./App.css";

function App() {
  const [homevalue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Update the downPaymentValue : 20% of current homevalue
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  }, [homevalue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>
        <div>
          <p>Home Value</p>
          <p>{homevalue} $</p>
          <input
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
          />
        </div>
        <div>
          <p>Down Payment</p>
          <p>{homevalue - loanAmount} $</p>
          <input
            onChange={(e) => {
              setDownPayment(parseInt(e.currentTarget.value));
              setLoanAmount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downPayment}
          />
        </div>
        <div>
          <p>Loan Amount</p>
          <p>{homevalue - downPayment} $</p>
          <input
            onChange={(e) => {
              setLoanAmount(parseInt(e.currentTarget.value));
              setDownPayment(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={loanAmount}
          />
        </div>
        <div>
          <p>Interest Rate</p>
          <p>% {interestRate}</p>
          <input
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
          />
        </div>
      </div>
      <div style={{ width: "300px" }}>
        <h3>Monthly Payment: $ {monthlyPayment}</h3>
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;