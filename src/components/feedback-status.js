import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, ButtonGroup, Text } from "@chakra-ui/core"
import gql from "graphql-tag"

// mutation to update status from client
const UpdateFeedbackMutation = gql`
  mutation($input: FeedbackStatusInput!) {
    updateFeedback(input: $input) {
      id
      status
    }
  }
`

// this could make sense using a state machine if more statuses are added
const FeedbackStatus = ({ id, client }) => {
  const loading = false
  const [updateFeedback, { data: mutationResult }] = useMutation(
    UpdateFeedbackMutation,
    {
      ssr: false,
    }
  )
  // reads data fetched in the index page from the apollo cache to speed things
  // up and allow observables to update status once the mutation returns a result
  const feedbackFromCache = client.readFragment({
    id: `Feedback:${id}`,
    fragment: gql`
      fragment feedback on Feedback {
        id
        status
      }
    `,
  })

  const isClosed = feedbackFromCache.status === `CLOSED`

  return (
    <div style={{ display: `flex` }}>
      <ButtonGroup spacing={2} mx={2}>
        {isClosed ? (
          <Button
            size="xs"
            variantColor="blue"
            variant="ghost"
            disabled={loading}
            onClick={() => {
              console.log(`Repening ID: ${id}`)
              updateFeedback({
                variables: {
                  input: {
                    id,
                    status: `OPEN`,
                  },
                },
              })
            }}
          >
            Reopen
          </Button>
        ) : (
          <Button
            size="xs"
            leftIcon="check"
            variantColor="gray"
            variant="solid"
            disabled={loading}
            onClick={() => {
              console.log(`Closing ID: ${id}`)
              updateFeedback({
                variables: {
                  input: {
                    id,
                    status: `CLOSED`,
                  },
                },
              })
            }}
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
}

export default FeedbackStatus
