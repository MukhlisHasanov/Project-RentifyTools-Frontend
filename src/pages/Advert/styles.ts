import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 50px;
`
// export const BackButtonWrapper = styled.div`
// display: flex;
// flex-direction: row;
// gap: ;
// `
export const BackButtonControl = styled.div`
  width: 80px;
  position: fixed;
  left: 100px;
  top: 100px;
`

export const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 550px;
  border: 1px solid ${colors.WHITE};
  padding: 60px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
`

export const ProductImageControl = styled.img`
  width: 400px;
`

export const ProfileImageControl = styled.img`
  width: 100px;
  /* height: 100px; */
  border-radius: 50%;
  /* align-items: center; */
`

export const PhotoFrame = styled.div``

export const DescriptionFrame = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  border: 1px solid ${colors.WHITE};
  padding-left: 20px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
  /* background-color: blue; */
  justify-content: space-between;
`

export const ToolInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  display: flex;
  margin-top: 30px;
  padding: 10px;
  gap: 10px;

  /* background-color: yellow; */
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* background-color: green; */
  align-items: center;
  gap: 20px;
  border-left: 2px solid white;
`

export const ButtonControl = styled.div`
  border: none;
`
