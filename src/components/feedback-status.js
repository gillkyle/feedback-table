import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
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

// query to fetch all content dynamically
const FeedbackQuery = gql`
  query($id: ID!) {
    getFeedbackById(id: $id) {
      id
      status
    }
  }
`

const FeedbackStatus = ({ id }) => {
  const { data, loading } = useQuery(FeedbackQuery, {
    variables: { id: id },
    ssr: false,
  })
  const [updateFeedback, { data: mutationResult }] = useMutation(
    UpdateFeedbackMutation,
    {
      ssr: false,
    }
  )

  // this could make sense as a state machine if more statuses are added
  const isClosed = !loading && data.getFeedbackById.status === `CLOSED`
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
