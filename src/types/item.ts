export type Item = {
    _id: string,
    foreign_id:  string,
    name: string,
    description?: string,
    short_description?: string,
    category: string,
    sub_category?: string,
    is_packing?: Boolean,
    pieces_package?: number,
    is_controlled: Boolean,
    controlled_group?: string,
    clasification?: string,
    unit_price?: number,
    created_at: Date,
    updated_at: Date,
    disbled: Boolean,
    version: string,
    sku: string
}

export type ItemPaginationProps = {
    limit: number,
    page: number
}

export interface ItemStateProps extends ItemPaginationProps{
    records: Item[],
    errors?: Error[]
}