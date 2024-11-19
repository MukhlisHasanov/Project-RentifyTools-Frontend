import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { rentTool } from './rentToolThunk'  
import { AppDispatch } from '../../store/store'  

interface UserInfo {
  name: string
  email: string
  phone: string
}

interface RentToolProps {
  toolId: number
}

const RentToolComponent: React.FC<RentToolProps> = ({ toolId }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
  })

  const dispatch = useDispatch<AppDispatch>()  

  const handleRent = () => {
    const rentData = {
      toolId: toolId,
      userName: userInfo.name,
      userEmail: userInfo.email,
      userPhone: userInfo.phone,
    }

    
    dispatch(rentTool(rentData))
  }

  return (
    <div>
      <h2>Mieten Sie das Tool</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </div>
      <div>
        <label>E-Mail</label>
        <input
          type="email"
          placeholder="E-Mail"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>
      <div>
        <label>Telefon</label>
        <input
          type="text"
          placeholder="Telefon"
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
      </div>
      <button onClick={handleRent}>Tool mieten</button>
    </div>
  )
}

export default RentToolComponent