export interface InboxMessageProps {
  id: string
  userName: string
  messageText: string
  onAccept: () => void
  onDecline: () => void
  isInbox?: boolean
}
