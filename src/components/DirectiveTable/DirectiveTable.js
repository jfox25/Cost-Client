import { useState, useEffect } from "react";
import styles from './DirectiveTable.module.css'
import DirectiveTablePage from "./DirectiveTablePage";
const OVERHEAD = "Overhead";
const DISCRETIONARY = "Discretionary";
const INVESTMENT = "Investment";
const OVERHEAD_DESCRIPTION = "An overhead expense refers to the expenses and costs required to run a business. At Cost, we refer to it as an expense which is needed to keep your life functioning. Common examples include rent, food, gas, utilities, phone, car, etc.  These expenses cover your physiological and safety needs.";
const DISCRETIONARY_DESCRIPTION = "A discretionary expense is an expense you can live without. This can be difficult to decipher sometimes, as most people think they need more than that actually do, but this is an expense that won’t cause havoc. For example, if you don’t pay your rent your life will get messy, but skipping takeout isn’t going to disrupt your life. These expenses are nice to have, but not required.";
const INVESTMENT_DESCRIPTION = "An investment expense is cost you take on now, with the hope that more value will be returned at some point. This can be stocks, bonds, houses, education, books, gym membership, etc. Deciding what makes an investment expense is all up to you, just remember that it should help you improve your situation over the long term.";
const DirectiveTable = ({ directives }) => {
    const [activeDirective, setActiveDirective] = useState(OVERHEAD)
    const [content, setContent] = useState(<DirectiveTablePage directive={directives[0]} description={OVERHEAD_DESCRIPTION}/>)
    useEffect(() => {
        switch (activeDirective) {
            case OVERHEAD:
                setContent(<DirectiveTablePage directive={directives[0]} description={OVERHEAD_DESCRIPTION}/>)
                break;
            case DISCRETIONARY:
                setContent(<DirectiveTablePage directive={directives[2]} description={DISCRETIONARY_DESCRIPTION}/>)
                break;
            case INVESTMENT:
                setContent(<DirectiveTablePage directive={directives[1]} description={INVESTMENT_DESCRIPTION}/>)
                break;
            default:
                break;
        }
    }, [activeDirective])
    return (
      <div>
        <ul className={styles.directiveNameList}>
          <li
            onClick={(e) => {
              setActiveDirective(e?.target?.innerText);
            }}
            className={activeDirective === OVERHEAD ? styles.active : null}
          >
            {OVERHEAD}
          </li>
          <li
            onClick={(e) => {
              setActiveDirective(e?.target?.innerText);
            }}
            className={activeDirective === DISCRETIONARY ? styles.active: null}
          >
            {DISCRETIONARY}
          </li>
          <li
            onClick={(e) => {
              setActiveDirective(e?.target?.innerText);
            }}
            className={activeDirective === INVESTMENT ? styles.active : null}
          >
            {INVESTMENT}
          </li>
        </ul>
        {content}
      </div>
    );
}

export default DirectiveTable;