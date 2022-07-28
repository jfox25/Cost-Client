<h1 align="center" style="color:#d2042d">Cost Client</h1>

<p align="center">
    <img style="width: 400px" src="./CostLogo.png">
</p>
<p align="center">By <a href="https://github.com/jfox25">James Fox</a></p>

## About
Cost is a full stack web application that help users manage their expenses. The core ideas of Cost is to allow users to easily add, view, and analyze their expenses, giving them clear insights into how better to manage their money. Users can add Business to the system for easy access, when creating expenses. Categories help users organize and breakdown their expenses too easily see where their money goes. Directives builds on this more, by grouping expenses into three distinct categories. Lots of expenses are repeated on a consistent or inconsistent basis, in order to prevent the need to re-enter expenses, Cost has Frequents. Frequents are a model of an expense that occurs in a user’s daily life frequently. They can be used to quickly generate an expense, by storing business, directive, category, and price information. Great for repetitive, inconsistent expenses like a coffee order or a car wash. Frequents can also handle consistent expenses like rent or a gym memberships. In order to understand their expenses better, Cost provides users with leader board, chart, and table views. These views show relevant information to the user to help give them better insights into their data. 


## Technologies Used

- React 18.2.0
- Axios
- React Router
- ChartJs
- FortAwesome

## Project Requirements

1. Node
2. [Cost-Api](https://github.com/jfox25/Cost-Api) instance

## Project Setup

1. Clone this repository to your desktop using git clone

```
git clone https://github.com/jfox25/Cost-Client
```
2. Install all necessary dependencies 
```
npm install
```

3. Change the axios url to the url of your local [Cost-Api](https://github.com/jfox25/Cost-Api) instance.  
```
dotnet install
```
4. Start saving!

## Other Cost Repositories
- [Cost-Api](https://github.com/jfox25/Cost-Client)
- [Cost-Research](https://github.com/jfox25/Cost-Research)

## GitHub Link

[Link to Code on GitHub](https://github.com/jfox25/Cost-Client)

## Creator's Linkedin 

[Linkedin](https://www.linkedin.com/in/jamesconnorfox/)

## Capstone Information

### MVP Status
Project reaches the Mvp
```
Cost Capstone Proposal

MVP LIST

- To let users easily view and understand their expenses through interactive tables, charts and other analytics.
- List the absolute minimum features the project requires to meet this purpose or goal:
- Users can log in/ log out with Api
- Users can add expenses, frequents, locations, categories
- Users can view expenses in interactive table with sorting/filtering functionality
- Forms user modal
- Users can go to an analytics page and view charts and details about their expenses

What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.
Chart.JS
React
Styled Components
Expense Api
Css
Html
Javascript
Jest
Node
Webpack

```

### Research and planning Log
```
7/8/22
8:10, start to build component tree diagram for table-demo
8:40, start research into how to do api calls in a react app
9:10, start research into CORS policy
9:50, continue research into api calls in react apps
11:30, building out demo application
1:20, research into style components in react
3:30, add styling to demo project
4:10, start work on capstone proposal.
Demo Project : https://github.com/jfox25/Capstone-Table-Demo

7/15/22: 
8:05, start research into creating a login/register/logout functionality.
9:15, start to look into attacks my application could be comporomised by.
10:10, start first video tutorial on adding login/register functionality.
1:15, start second tutorial on adding login page.
2:25, cont. work on second tutorial on adding login page.
3:17, start doing research on react-router and how to incorporate it into demo project
4:16, finish up research and devlopment for react-router and login form
Demo Project : https://github.com/jfox25/Capstone-Table-Demo

```

## Bugs

- No know bugs at this time. 

## Future Improvements

- Change several components for better performance and readability.
- Authentication changes
- Admin functionality
- Score System

## License

MIT
Copyright (c) 2022 James Fox
