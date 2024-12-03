import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const InboxMessageContainer = styled.div`
display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 700px;
  border: 1px solid ${colors.WHITE};
  padding: 15px;
  border-radius: 5px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
`
export const InboxContent = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.WHITE};
  overflow: hidden;
`
export const InboxName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.WHITE};
`
export const InboxMessageText = styled.div`
  font-size: 16px;
  color: ${colors.WHITE};
  display:flex;
  word-break: break-word;
`

export const InboxIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const InboxIcon = styled.span`
  cursor: pointer;
  color: ${colors.BUTTON};
`
export const TextControl = styled.div`
width: 200px;
word-break: break-word;
`