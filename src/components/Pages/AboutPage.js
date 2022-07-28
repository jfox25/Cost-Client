import CollapseSection from "../Extra/CollapseSection"
import styles from "./AboutPage.module.css"
import { faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const AboutPage = () => {
  const TECH_STACK_TEXT = (
    <div>
      <div>
        <h3 className={styles.subTitle}>Server</h3>
        <ul>
          <li><span className={styles.bold2}>Type</span> : .Net 5 Web Api</li>
          <li><span className={styles.bold2}>Primary Language</span> : C#</li>
          <li><span className={styles.bold2}>Database</span> : PostgresSql</li>
          <li><span className={styles.bold2}>Hosted</span> : Heroku</li>
          <li><span className={styles.bold2}>Dependencies & Packages</span> : 
              <ul>
                <li>Microsoft Identity</li>
                <li>Microsoft EntityFrameworkCore</li>
                <li>Microsoft Authentication JWTBearer</li>
                <li>AutoMapper</li>
              </ul>
          </li>
        </ul>
        <p></p>
      </div>
      <div>
        <h3 className={styles.subTitle}>Client</h3>
        <ul>
          <li><span className={styles.bold2}>Type</span> : React Application</li>
          <li><span className={styles.bold2}>Primary Language</span>: Javascript</li>
          <li><span className={styles.bold2}>Hosted</span>: Netlify</li>
          <li><span className={styles.bold2}>Dependencies & Packages</span>: 
              <ul>
                <li>React</li>
                <li>Axios</li>
                <li>Chart Js</li>
                <li>React Router</li>
              </ul>
          </li>
        </ul>
        <p></p>
      </div>
    </div>
  )
  const LINKS_TEXT = (
    <div>
      <div>
        <p>Link to Creator's Github : <a href='https://github.com/jfox25' target="/"><FontAwesomeIcon icon={faGithub} className={styles.socialItem} /></a></p>
        <p>Link to Creator's Linkedin : <a href='https://www.linkedin.com/in/jamesconnorfox/' target="/"><FontAwesomeIcon icon={faLinkedin} className={styles.socialItem}/></a></p>
        <p>Link to Cost Client on Github : <a href='https://github.com/jfox25/Cost-Client' target="/"><FontAwesomeIcon icon={faGithub} className={styles.socialItem} /></a></p>
        <p>Link to Cost Api on Github : <a href='https://github.com/jfox25/Cost-Api' target="/"><FontAwesomeIcon icon={faGithub} className={styles.socialItem} /></a></p>
      </div>
    </div>
  )
  const Q_A_TEXT = (
    <div>
      <h3 className={styles.subTitle}>Creator Q/A</h3>
      
      <div>
        <label className={styles.label}>What was learned in the development process?</label>
        <div>
          <p>Its safe to say I learned a lot in the development of this application. For starters, I didn't have much experience building functionality in react, so I had to learn while developing. I was able to get an understanding of the basic react hooks, and I was off to building. As the application grew so did my knowledge, as a result, I plan on going through the client to find ways to improve it in the future.</p>
          <p>On the server side, I struggled a lot with deploying the application, but after multiple attempts I got it. After dealing with that long and frustrating process, I have a new understanding of the world of web deployment. I plan to practice deploying more in the future with other service like Azure.</p>
        </div>
      </div>
      <div>
        <label className={styles.label}>What were the biggest struggles?</label>
        <div>
          <p>Dates. I am going to be taking a break from dates for a while. There are always a pain to work with and this application was no exception. Hosting both ends of the application was also a struggle, especially the back end. Adding Authentication to the client took way longer than expected as well, but I also could have researched better.</p>
        </div>
      </div>
      <div>
        <label className={styles.label}>What are the plans for future improvements?</label>
        <div>
          <p>I want to get the authentication to work better on the client. Right now if you go to the home page, you have to log back in to view your data, even with a valid refresh token. I also plan on doing a lot of code cleanup on the server and client.</p>
        </div>
      </div>
    </div>
  )
  return (
    <div className={styles.aboutPageContainer}>
      <Link to="/" className={styles.homeButton}><FontAwesomeIcon icon={faHome} className={styles.socialItem} /></Link>
      <h1 className={styles.subTitle}>About Cost</h1>
      <p className={styles.aboutText}><span className={styles.bold}>Cost</span> is a full stack web application that help users manage their expenses. The core ideas of Cost is to allow users to easily add, view, and analyze their expenses, giving them clear insights into how better to manage their money. Users can add <span className={styles.bold}>Businesses</span> to the system for easy access, when creating expenses. <span className={styles.bold}>Categories</span> help users organize and breakdown their expenses too easily see where their money goes. <span className={styles.bold}>Directives</span> builds on this more, by grouping expenses into three distinct categories. Lots of expenses are repeated on a consistent or inconsistent basis, in order to prevent the need to re-enter expenses, Cost has Frequents. <span className={styles.bold}>Frequents</span> are a model of an expense that occurs in a user’s daily life frequently. They can be used to quickly generate an expense, by storing business, directive, category, and price information. Great for repetitive, inconsistent expenses like a coffee order or a car wash. Frequents can also handle expenses for consistent purchases like rent or a gym memberships. In order to understand their expenses better, Cost provides users with leaderboard, chart, and table views. These views show relevant information to the user to help give them better insights into their data. </p>
      <CollapseSection title={"Tech Stack Information"} content={TECH_STACK_TEXT} />
      <CollapseSection title={"Links"} content={LINKS_TEXT} />
      <CollapseSection title={"Questions and Answers"} content={Q_A_TEXT} />
    </div>
  )
}

export default AboutPage