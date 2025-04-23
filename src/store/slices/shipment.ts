import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "../../types";
import axios from "../../utils/axios";
import { dispatch } from "..";

const initialState: {shipments: DefaultRootStateProps["shipments"]} = {
    shipments: []
}

const slice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        setShipments: (state, action) => {
            state.shipments = action.payload
        }
    }
})

export default slice.reducer

export const getShipments = (params: {}) => {
    return async () => {
        try{
            const response = await axios.get("/pedidos-pendientes", {params})
            dispatch(slice.actions.setShipments(response.data))
        }catch(error){
            console.log(error)
        }
    }
}