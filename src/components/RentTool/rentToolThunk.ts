import { createAsyncThunk } from '@reduxjs/toolkit';

interface RentData {
    toolId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
}

export const rentTool = createAsyncThunk(
    'rent/rentTool', 
    async (rentData: RentData, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rents/${rentData.toolId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toolId: rentData.toolId,
                    userName: rentData.userName,
                    userEmail: rentData.userEmail,
                    userPhone: rentData.userPhone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData); 
            }

            const result = await response.json();
            return result;  
        } catch (error) {
            return rejectWithValue('Es ist ein Fehler aufgetreten');  
        }
    }
);