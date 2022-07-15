import React from 'react'
import styles from './GroupHeading.module.css'

const GroupHeading = (props) => {
    const hasCostProperty = props.items[0].hasOwnProperty("Cost")
    const hasNoGroupName = () => {
        return props.groupName === undefined;
    }
    const totalCostOfItems = (items) => {
        return items.reduce(function (acc, obj) { return acc + obj.Cost; }, 0);
    }
    const getPercentageOfTotalCost = (totalCost, groupCost) => {
        return Math.ceil(((100 * groupCost) / totalCost) * 100) / 100;
    }
    const titleIsInt = (title) => {
        return Number.isInteger(title);
    }
    const numberOfItems = props.items.length;
    return (
        <div className={styles.groupHeading}>
           {!hasNoGroupName() && <div className={styles.title}>{titleIsInt(props.groupName) && `${props.activeColumn.replace(/([A-Z])/g, ' $1').trim()} :`}<span>{props.groupName}</span></div>}
           <div className={styles.numberOfItems}>Total Number: <span>{numberOfItems}</span></div>
           {hasCostProperty && <div className={styles.costOfItems}>Total Cost: <span>${totalCostOfItems(props.items)}/{getPercentageOfTotalCost(props.totalCostOfItems ,totalCostOfItems(props.items))}%</span></div> }
        </div>
    )
}

export default GroupHeading;