export interface ShipmentStateProps extends ShipmentPaginationProps{
    records: Shipment[],
    errors?: Error[]
}

export type ShipmentPaginationProps = {
    limit: number,
    page: number,
    sort: [string, "asc" | "desc"],
    filters: {
        review_status?: ShipmentReviewStatus 
    }
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
    shipment_type: string,
    application_date: Date,
    updated_at: Date,
    created_at: Date,
    version: string
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
    umu_id: string,
    _id: string,
    shipment: MinShipment,
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

export enum ShipmentStatus {
    DISPATCHED
}

export enum ShipmentReviewStatus {
    NOT_EVALUATED,
    REJECTED,
    APPROVED,
    PARTIAL_APPROVED
}

export enum ShipmentType {
    URGENT,
    STANDARD,
    LIFE_SUPPORT,
    EXTRAORDINARY
}

export type ShipmentValidate = {
    shipment_detail_id: string;
    accepted_quantity: number
}
