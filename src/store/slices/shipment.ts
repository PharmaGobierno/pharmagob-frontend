import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "../../types";
import axios from "../../utils/axios";
import { dispatch } from "..";
import { ShipmentPaginationProps } from "../../types/shipment";

const initialState: DefaultRootStateProps["shipments"] = {
    records: [],
    page: 1,
    limit: 20,
    count: 0,
    sort: ["created_at", "desc"],
    filters: {},
    errors: []
}

const slice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        selectShipment: (state, action) => {
            let record = state.records.findIndex(r => r._id === action.payload)
            if(!record) return

            state.selected = record
        },
        setShipments: (state, action) => {
            const data = action.payload

            state.records = data?.data?.items
            state.errors = data?.errors
            state.count = data?.data?.items_count
        },
        setPagination: (state, {payload}: {payload: Partial<ShipmentPaginationProps>}) => {
            if(payload.page) state.page = payload.page
            if(payload.limit) state.limit = payload.limit
            if(payload.sort) state.sort = payload.sort
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
            let sort = params.sort?.join(":") || undefined 

            const response = await axios.get("https://pharma-gateway-682pqs65.uc.gateway.dev/v1/shipments", {
                params: {
                    ...params,
                    sort
                }
            })
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


export const selectShipment = (id: string) => {
    dispatch(slice.actions.selectShipment(id))
}