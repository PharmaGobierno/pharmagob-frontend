export interface ShipmentStateProps extends ShipmentPaginationProps{
    records: Shipment[],
    errors?: Error[],
    selected?: number // Index of record
}

export type ShipmentPaginationProps = {
    limit: number,
    page: number,
    count: number,
    sort: [string, "asc" | "desc"],
    search?: string | null,
    review_status_in?: ShipmentReviewStatus[]
}

export interface ShipmentValidateStateProps{
    records: ShipmentValidate[],
    errors?: Error[]
}

export type Shipment = {
    umu_id: string,
    _id: string,
    order_number: string,
    load_id: string,
    order_id: string,
    status:  ShipmentStatus,
    review_status: ShipmentReviewStatus,
    shipment_type: ShipmentType,
    application_date: BigInt,
    updated_at: BigInt,
    created_at: BigInt,
    version: string
}

export type ShipmentStatus = "DISPATCHED"
export type ShipmentReviewStatus = "NOT_EVALUATED" | "REJECTED" | "APPROVED" | "PARTIAL_APPROVED"
export type ShipmentType = "URGENT" | "STANDARD" | "LIFE_SUPPORT" | "EXTRAORDINARY"

// Enums
export enum ShipmentStatusEnum {
    "DISPATCHED"
}

export enum ShipmentReviewStatusEnum {
    "NOT_EVALUATED",
    "REJECTED",
    "APPROVED",
    "PARTIAL_APPROVED"
}

export enum ShipmentTypeEnum {
    "URGENT",
    "STANDARD",
    "LIFE_SUPPORT",
    "EXTRAORDINARY"
}

export interface MinShipment extends Partial<Shipment> {
    umu_id: string,
    id: string,
    order_number: string,
    load_id: string,
    order_id: string
}

export type ShipmentDetails = {
    item: ShipmentItem,
    shipment: MinShipment,
    umu_id: string,
    _id: string,
    lot: string,
    expiration_date?: Date,
    quantity: number,
    brand?: string,
    last_author?: string,
    updated_at: Date,
    created_at: Date,
    version: string
}

export type ShipmentItem = {
    foreign_id: string,
    id: string,
    name: string
}

export type ShipmentValidate = {
    shipment_detail_id: string;
    accepted_quantity: number
}
