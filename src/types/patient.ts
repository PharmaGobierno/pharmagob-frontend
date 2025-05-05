export interface PatientStateProps extends PatientPaginationProps{
    records: Patient[],
    errors?: Error[],
    selected?: number
}

export type PatientPaginationProps = {
    limit: number,
    page: number,
    count: number,
    sort: [string, "asc" | "desc"]
}

export type Patient = {
    _id: string,
    umu_id: string,
    created_at: BigInt,
    updated_at: BigInt,
    version: number,
    name: string,
    curp: string,
    last_name_1: string,
    last_name_2?: string,
    phone_number: string,
    email?: string,
    birth: BigInt,
    postal_code: string,
    state: string,
    municipality: string,
    neighborhood?: string,
    street_address?: string,
    country?: string
}