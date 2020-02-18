<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Feedback Table
</h1>

Central source for examining and triaging feedback from the docs at gatsbyjs.org.

## Overview

Data from api.gatsbyjs.org (stored in a Prisma database) is fetched by the site and rendered in a paginated/filterable/searchable table. Feedback comments can be validated and marked as "closed" when they have been addressed.

Members of the Learning team most often use the feedback table to get a holistic feel for specific docs on the site, and a general sentiment of how certain guides or docs are teaching learners. They may also find places for improvement in the docs based on suggestions and feedback.

## Developing

You can run this site locally after cloning:

```
# clone the repo
git clone <repo-url>

# move into directory
cd feedback-table

# install dependencies
yarn # or npm install

# run the start script
yarn develop
```

_If you would like to change where the data is coming from (like to make local changes to api.gatsbyjs.org), you can add a `GATSBY_APOLLO_URL` to a .env.development file with the endpoint `localhost:3000/public`_

## Using the table

The table is based off of the [`react-table` library](https://github.com/tannerlinsley/react-table), and options for it can be applied to this table.

### Sorting

You can click on table headers to sort ASC or DESC. If you hold shift you can click on multiple headers at the same time to sort on multiple criteria.

### Searching

Some data that is text based can be searched by text with the input boxes at the top of the column.

### Closing Feedback

You can close/reopen a piece of feedback with the button labeled "Close" or "Reopen". This will update the status of the feedback in the database.

### Pivoting data

A select box above the table can adjust the pivot of the data to group information together based on the doc page feedback is included on, or to display all feedback in one long list. Using the all data pivot can help to see all feedback sorted by a category like date.
