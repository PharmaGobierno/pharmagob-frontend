import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "../../types";
import axios from "../../utils/axios";
import { dispatch } from "..";
import { PatientPaginationProps } from "../../types/patient";

const initialState: DefaultRootStateProps["patient"] = {
    records: [],
    page: 1,
    limit: 20,
    count: 0,
    sort: ["created_at", "desc"],
    errors: []
}

const slice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        selectPatient: (state, action) => {
            let record = state.records.findIndex(r => r._id === action.payload)
            if(!record) return

            state.selected = record
        },
        setPatients: (state, action) => {
            const data = action.payload

            state.records = data?.data?.items
            state.errors = data?.errors
            state.count = data?.data?.items_count
        },
        setPagination: (state, {payload}: {payload: Partial<PatientPaginationProps>}) => {
            if(payload.page) state.page = payload.page
            if(payload.limit) state.limit = payload.limit
            if(payload.sort) state.sort = payload.sort

            state.search = payload.search?.length ? payload.search : undefined
        },
        setErrors: (state, action) => {
            state.errors = action.payload
        }
    }
})

export default slice.reducer

export const getPatients = (params: Partial<PatientPaginationProps>) => {
    return async () => {
        try{
            let sort = params.sort?.join(":") || undefined 
            let uri = "/v1/patients"

            if(params.search) uri = "/v1/searches/patients"

            const response = await axios.get(uri, {
                params: {
                    ...params,
                    curp: params.search,
                    sort
                }
            })
            dispatch(slice.actions.setPatients(response.data))
        }catch(error){
            dispatch(slice.actions.setErrors([error]))
        }
    }
}

export const setPagination = (params: Partial<PatientPaginationProps>) => {
    return () => {
        dispatch(slice.actions.setPagination(params))
    }
}


export const selectPatient = (id: string) => {
    dispatch(slice.actions.selectPatient(id))
}