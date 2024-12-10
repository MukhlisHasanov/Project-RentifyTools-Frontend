export interface MessageRequest {
  senderName: string; // The name of the sender
  senderEmail: string; // The email of the sender
  recipientName: string; // The name of the recipient
  recipientEmail: string; // The email of the recipient
  message: string; // The message content
  }
  
  export interface MessageInitialState {
    isLoading: boolean
    success: boolean | undefined
    error: string | undefined
  }