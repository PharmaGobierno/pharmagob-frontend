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