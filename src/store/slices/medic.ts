import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "../../types";
import axios from "../../utils/axios";
import { dispatch } from "..";
import { MedicPaginationProps, CreateMedic } from "../../types/medic";

const initialState: DefaultRootStateProps["medic"] = {
    records: [],
    page: 1,
    limit: 20,
    count: 0,
    sort: ["created_at", "desc"],
    errors: []
}

const slice = createSlice({
    name: "medic",
    initialState,
    reducers: {
        selectMedic: (state, action) => {
            let record = state.records.findIndex(r => r._id === action.payload)
            if(!record) return

            state.selected = record
        },
        setMedics: (state, action) => {
            const data = action.payload

            state.records = data?.data?.items
            state.errors = data?.errors
            state.count = data?.data?.items_count
        },
        setPagination: (state, {payload}: {payload: Partial<MedicPaginationProps>}) => {
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

export const getMedics = (params: Partial<MedicPaginationProps>) => {
    return async () => {
        try{
            let sort = params.sort?.join(":") || undefined 
            let uri = "/v1/doctors"

            if(params.search) uri = "/v1/searches/doctors"

            const response = await axios.get(uri, {
                params: {
                    ...params,
                    employee_number: params.search,
                    sort
                }
            })
            dispatch(slice.actions.setMedics(response.data))
        }catch(error){
            dispatch(slice.actions.setErrors([error]))
        }
    }
}

export const setPagination = (params: Partial<MedicPaginationProps>) => {
    return () => {
        dispatch(slice.actions.setPagination(params))
    }
}


export const selectMedic = (id: string) => {
    dispatch(slice.actions.selectMedic(id))
}

export const createMedic = async (data: CreateMedic) => {
    try {
        const response = await axios.post(`/v1/doctors`, data);
        return response;
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
