import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactTable from "react-table"
import mean from "lodash.mean"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Select,
  Text,
} from "@chakra-ui/core"

import "react-table/react-table.css"

export const query = graphql`
  {
    gatsby {
      feedback: getFeedback {
        comment
        url: originUrl
        rating
        date
        status
      }
    }
  }
`

export default ({ data }) => {
  const feedback = data.gatsby.feedback.map(rating => ({
    ...rating,
    url: rating.url
      .replace(/https:\/\/(www\.)?gatsbyjs.org/, "")
      .replace(/\/$/, ""),
    date: new Date(rating.date),
  }))
  const [pivot, setPivot] = useState(`url`)
  function handleSelect(event) {
    if (event.target.value === `all`) {
      setPivot(undefined)
    } else {
      setPivot(event.target.value)
    }
  }

  return (
    <>
      <Heading as="h1" p={4}>
        Docs Feedback
      </Heading>
      <Box style={{ display: `flex`, alignItems: `center` }} p={4}>
        <div>Pivot table by:</div>
        <Select
          placeholder=""
          size="sm"
          w="200px"
          ml="10px"
          onChange={e => handleSelect(e)}
        >
          <option value={`url`}>Url</option>
          <option value={`all`}>All</option>
        </Select>
      </Box>
      <Alert status="info" mb={2}>
        <AlertIcon />
        Hold shift and click on header names to sort by multiple properties
      </Alert>
      <ReactTable
        key={pivot}
        data={feedback}
        columns={[
          {
            Header: "Feedback",
            columns: [
              {
                Header: "URL",
                id: "url",
                accessor: d =>
                  d.url.replace(/https:\/\/(www\.)?gatsbyjs.org/, ""),
                filterMethod: (filter, row) =>
                  row[filter.id].includes(filter.value),
                minWidth: 300,
              },
              {
                Header: "Rating",
                accessor: "rating",
                aggregate: vals => mean(vals),
                Aggregated: row => <span>{row.value.toFixed(1)} (avg)</span>,
                width: 75,
                filterable: true,
              },
              {
                Header: "Comment",
                id: "comment",
                accessor: d => (
                  <span
                    style={{
                      display: "block",
                      whiteSpace: "normal",
                    }}
                  >
                    {d.comment}
                  </span>
                ),
                aggregate: () => 1,
                Aggregated: () => <span>expand to read comments</span>,
                filterable: false,
                minWidth: 300,
              },
              {
                Header: "Date",
                id: "date",
                width: 150,
                accessor: d => d.date.toISOString().split("T")[0],
                aggregate: vals =>
                  vals
                    .map(d => new Date(d))
                    .sort((a, b) => b.getTime() - a.getTime())[0]
                    .toISOString()
                    .split("T")[0],
                Aggregated: row => <span>Updated {row.value}</span>,
                filterable: false,
                sortMethod: (a, b) =>
                  new Date(b).getTime() - new Date(a).getTime(),
              },
              {
                Header: "Status",
                id: "status",
                accessor: d => {
                  // this could make sense as a state machine if more statuses are added
                  const isClosed = d.status === `CLOSED`
                  return (
                    <div style={{ display: `flex` }}>
                      <ButtonGroup spacing={2} mx={2}>
                        {isClosed ? (
                          <Button size="xs" variantColor="blue" variant="ghost">
                            Reopen
                          </Button>
                        ) : (
                          <Button
                            size="xs"
                            leftIcon="check"
                            variantColor="gray"
                            variant="solid"
                          >
                            Close
                          </Button>
                        )}
                      </ButtonGroup>
                      <Text color={isClosed ? "gray.300" : "gray.600"}>
                        {isClosed ? (
                          <Text as="i" fontSize="sm">
                            Closed
                          </Text>
                        ) : (
                          <Text as="i" fontSize="sm">
                            Open
                          </Text>
                        )}
                      </Text>
                    </div>
                  )
                },
                aggregate: () => "",
                filterable: false,
              },
            ],
          },
        ]}
        pivotBy={pivot ? [pivot] : undefined}
        className="-striped -highlight"
        filterable
      />
    </>
  )
}
