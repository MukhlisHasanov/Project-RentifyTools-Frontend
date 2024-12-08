import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import { colors } from 'styles/colors'

import { InboxMessageProps } from './types'
import {
  InboxMessageContainer,
  InboxMessageText,
  InboxContent,
  InboxIcon,
  InboxIcons,
  InboxName,
  TextControl,
} from './styles'

function InboxMessage({
  id,
  userName,
  messageText,
  onAccept,
  onDecline,
  isInbox = true,
}: InboxMessageProps) {
  return (
    <InboxMessageContainer>
      <InboxContent>
        <TextControl>
          <InboxName>Name: {userName}</InboxName>
        </TextControl>
        <InboxMessageText>Message: {messageText}</InboxMessageText>
        <InboxIcons>
          {isInbox ? (
            <>
              <IconButton
                onClick={onAccept}
                sx={{ color: colors.BUTTON }}
                aria-label="accept"
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                onClick={onDecline}
                sx={{ color: colors.BUTTON }}
                aria-label="cancel"
              >
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                // onClick={() => handleDelete(id)}
                sx={{ color: colors.BUTTON }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </InboxIcons>
      </InboxContent>
    </InboxMessageContainer>
  )
}
export default InboxMessage
