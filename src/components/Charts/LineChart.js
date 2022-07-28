import { Line } from "react-chartjs-2";
import { useState, useEffect} from "react";
import { Chart as ChartJS} from "chart.js/auto";
import styles from "./Chart.module.css";
const month = [{ name: "January", value: "01"},{ name: "February", value:"02"},{ name: "March", value:"03"},{ name: "April", value:"04"},{ name: "May", value:"05"},{ name: "June", value:"06"},{ name: "July", value:"07"},{ name: "August", value:"08"},{ name: "September", value:"09"},{ name: "October", value:"10"},{ name: "November", value:"11"},{ name: "December", value:"12"}];
const LineChart = ({ data, title }) => {
    data?.sort(function(a,b){
        const aYear = [a.Time.slice(0, -4), a.Time.slice(-4)];
        const bYear = [b.Time.slice(0, -4), b.Time.slice(-4)];
        const aMonth = month.filter((month) => {
            return aYear[0].slice(0, -2) === month.name
          }).map(obj => {
            return obj.value
          })
        const bMonth = month.filter((month) => {
            return bYear[0].slice(0, -2) === month.name
        }).map(obj => {
            return obj.value
        })
        const aDate = `${aYear[1]}-${aMonth[0]}-01`
        const bDate = `${bYear[1]}-${bMonth[0]}-01`
        return new Date(aDate) - new Date(bDate);
      });
    const [showTotalCost,setShowTotalCost] = useState(true);
    const [displayData ,setDisplayData] = useState({
        labels : data.map((dataItem) => dataItem.Time),
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
                labels : data.map((dataItem) => dataItem.Time),
                datasets : [{
                    label: "Total Cost of Expenses",
                    data: data.map((dataItem) => dataItem.TotalCost),
                    backgroundColor : ["#d2042d"],
                    borderColor: ["#d2042d"]
                }], 
            })
        }else {
            setDisplayData({
                labels : data.map((dataItem) => dataItem.Time),
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
                        size: 18
                    }
                }
            },
            y:{
                ticks: {
                    font : {
                        size: 18
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
        <Line data={displayData} options={options} />
        </>
    )
    if(data.length <= 1) {
        content = <h3>Add Expenses to at least two different months to visualize data</h3>
    }
  return (
    <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>{title}</h2>
        {content}
    </div>
  );
}

export default LineChart