import styled from "@emotion/styled"
import { NavLink } from "react-router-dom";
import { colors } from "styles/colors";



export const CardWrapper = styled(NavLink)`
  width: 450px;
  height: 250px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #4D4D4DC7;
  cursor: pointer;
`;

export const CardImage = styled.img`
  flex: 1;
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${colors.WHITE};
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: ${colors.WHITE};
`;

export const CardPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.WHITE};
  margin-bottom: 10px;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: ${colors.WHITE};
  margin-bottom: auto;
`;

export const CardIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardIcon = styled.span`
  cursor: pointer;
  color: ${colors.BUTTON};


  img {
    width: 32px;
    height: 32px;
  }  
`;
