import styled from "@emotion/styled"
//141124  import { CategoryImg1,CategoryImg2,CategoryImg3 } from "assets"
import { colors } from "styles/colors"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
`

export const PageTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.WHITE};
  margin-top: 10px;
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.HEADER};
  gap: 10px;
  border-radius: 7px;
`

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 элементов в каждом ряду */
  grid-gap: 20px; /* Отступы между элементами */
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
  width: 800px; /* Ширина серого контейнера */
  padding: 20px;
`
export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`

export const CategoryImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.WHITE};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const ImageTitle = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${colors.WHITE};
`
