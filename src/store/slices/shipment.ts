import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "../../types";
import axios from "../../utils/axios";
import { dispatch } from "..";
import { ShipmentPaginationProps } from "../../types/shipment";

const initialState: DefaultRootStateProps["shipments"] = {
    records: [],
    page: 1,
    limit: 20,
    sort: ["created_at", "desc"],
    filters: {},
    errors: []
}

const slice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        setShipments: (state, action) => {
            state.records = action.payload
        },
        setPagination: (state, {payload}: {payload: Partial<ShipmentPaginationProps>}) => {
            state = {
                ...state,
                ...payload
            }
        },
        setErrors: (state, action) => {
            state.errors = action.payload
        }
    }
})

export default slice.reducer

export const getShipments = (params: Partial<ShipmentPaginationProps>) => {
    return async () => {
        try{
            const response = await axios.get("https://pharma-gateway-682pqs65.uc.gateway.dev/v1/shipments", {params})
            dispatch(slice.actions.setShipments(response.data))
        }catch(error){
            dispatch(slice.actions.setErrors([error]))
        }
    }
}

export const setPagination = (params: Partial<ShipmentPaginationProps>) => {
    return () => {
        dispatch(slice.actions.setPagination(params))
    }
}