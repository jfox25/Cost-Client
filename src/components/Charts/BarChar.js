import { Bar } from "react-chartjs-2";
import { useState, useEffect} from "react";
import { Chart as ChartJS} from "chart.js/auto";
import styles from "./Chart.module.css";
const BarChart = ({ data, title }) => {
    console.log(data)
    const [showTotalCost,setShowTotalCost] = useState(true);
    const [displayData ,setDisplayData] = useState({
        labels : data.map((dataItem) => dataItem.Name),
        datasets : [{
            label: "Total Cost of Expenses",
            data: data.map((dataItem) => dataItem.TotalCost),
            backgroundColor : ["#d2042d"],
            borderColor: ["#d2042d"]
        }], 
    });
    useEffect(() => {
        if(showTotalCost) {
            setDisplayData({
                labels : data.map((dataItem) => dataItem.Name),
                datasets : [{
                    label: "Total Cost of Expenses",
                    data: data.map((dataItem) => dataItem.TotalCost),
                    backgroundColor : ["#d2042d"],
                    borderColor: ["#d2042d"]
                }], 
            })
        }else {
            setDisplayData({
                labels : data.map((dataItem) => dataItem.Name),
                datasets : [{
                    label: "Total Number of Expenses",
                    data: data.map((dataItem) => dataItem.ExpenseCount),
                    backgroundColor: ["blue"],
                    borderColor: ["blue"]
                }], 
            })
        }
    }, [showTotalCost])
    const options = {
        plugins : {
            legend : {
                labels: {
                  font : {
                    size : 15
                  },
                  color : "#333"
                }
              }
        },
        scales: {
            x:{
                ticks: {
                    font : {
                        size: 22
                    }
                }
            },
            y:{
                ticks: {
                    font : {
                        size: 20
                    }
                }
            }
        }
    }
    let content = (
        <>
        <div className={styles.chartButtonGroup}>
            <button
            onClick={() => setShowTotalCost(true)}
            className={showTotalCost ? styles.active : styles.button}
            >
            Total Cost of Expenses
            </button>
            <button
            onClick={() => setShowTotalCost(false)}
            className={!showTotalCost ? `${styles.activeBlue}` : styles.buttonBlue }
            >
            Total Number of Expenses
            </button>
        </div>
        <Bar data={displayData} options={options} />
        </>
    )
    if(data.length === 0) {
        content = <h3>Add More Expenses to visualize data</h3>
    }
  return (
    <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>{title}</h2>
        {content}
    </div>
  );
}

export default BarChart