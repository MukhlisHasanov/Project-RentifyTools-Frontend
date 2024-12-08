import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'
import InboxMessage from 'components/InboxMessage/InboxMessage'


import { PageWrapper, TitleContainer, Title } from './styles'


function Messages() {
  
//   const isRegistered = Boolean(localStorage.getItem('accessToken'))
  const [activeTitle, setActiveTitle] = useState<'Inbox' | 'Sent'>('Inbox'); // Активное состояние

  const onTitleClick = (title: 'Inbox' | 'Sent') => {
    setActiveTitle(title);
  };

//   const [isSignInMode, setIsSignInMode] = useState<boolean>(true)
//   const [isInboxMode, setIsInboxMode] = useState<boolean>(true)
//   const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

//   const onSignUpClick = () => setIsSignInMode(false)
//   const onSignInClick = () => setIsSignInMode(true)

//   const registrationSuccess = () => {
//     setIsSignInMode(true)
//     setShowSuccessMessage(true)
//     setTimeout(() => setShowSuccessMessage(false), 3000)
//   }
  return (
    <PageWrapper>
  <TitleContainer>
  <Title
        $isActive={activeTitle === 'Inbox'}
        onClick={() => onTitleClick('Inbox')}
      >
        Inbox
      </Title>
      <Title
        $isActive={activeTitle === 'Sent'}
        onClick={() => onTitleClick('Sent')}
      >
        Sent
      </Title>
        </TitleContainer>
        {activeTitle === 'Inbox' ? (
        <InboxMessage
          id="1"
          userName="Johnson"
          messageText="I would like rent a tool"
          onAccept={() => console.log('Accepted')}
          onDecline={() => console.log('Declined')}
          isInbox={true}
        />
      ) : (
        <InboxMessage
          id="2"
          userName="Emily"
          messageText="Thank you for the service!"
          onAccept={() => {}} 
          onDecline={() => {}}
          isInbox={false} 
        />
      )}
    </PageWrapper>
  )
}

export default Messages
