export interface ShipmentStateProps{
    umu_id: string,
    _id: string,
    order_number: string,
    load_id: string,
    order_id: string,
    status:  ShipmentStatus,
    review_status: ShipmentReviewStatus,
    shipment_type: string,
    application_date: Date,
    user?: null,
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