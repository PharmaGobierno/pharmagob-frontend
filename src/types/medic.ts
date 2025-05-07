export interface MedicStateProps extends MedicPaginationProps{
    records: Medic[],
    errors?: Error[],
    selected?: number
}

export type MedicPaginationProps = {
    limit: number,
    page: number,
    count: number,
    sort: [string, "asc" | "desc"]
}

export type Medic = {
    _id: string,
    umu_id: string,
    created_at: BigInt,
    updated_at: BigInt,
    version: number,
    name?: string,
    last_name_1: string,
    last_name_2?: string,
    employee_number: string,
    profesional_licence: string,
    status: MedicStatus,
    speciality: MedicSpeciality,
    service: MedicServices,
    level?: MedicLevel,
    job_position?: MedicJobPosition
}

export type CreateMedic = {
    name: string,
    last_name_1: string,
    last_name_2?: string,
    employee_number: string,
    profesional_licence: string,
    specialty: MedicSpeciality,
    service: MedicServices[],
    level?: MedicLevel,
    job_position?: MedicJobPosition
}

export const VALID_STATUSES = ["ACTIVE", "INACTIVE"] as const;

export type MedicStatus = typeof VALID_STATUSES[number];

export enum MedicSpeciality{
    "CARDIOLOGY" = "Cardiología",
    "DERMATOLOGY" = "Dermatología",
    "GYNECOLOGY" = "Ginecología",
    "GENERAL_MEDICINE" = "Medicina General",
    "NEUROLOGY" = "Neurología",
    "OPHTHAMOLOGY" = "Oftamología",
    "ORTHOPEDICS" = "Ortopedia",
    "OTORHINOLARYNGOLOGY" = "Otorrinolaringología",
    "PEDIATRICS" = "Pediatría",
    "PSYCHIATRY" = "Psiquiatría",
    "UROLOGY" = "Urología",
    "ANESTHESIOLOGY" = "Anestesiología",
    "DENTISTRY" = "Odontología"
}

export enum MedicServices {
    "SURGERY" = "Cirugía",
    "OUTPATIENT_CONSULTATION" = "Consulta Ambulatoria",
    "HOSPITALIZATION" = "Hospitalización",
    "PREVENTIVE_MEDICINE" = "Medicina Preventiva",
    "REHABILITATION" = "Rehabilitación",
    "EMERGENCY_CARE" = "Atención de Urgencias",
    "LABORATORY" = "Laboratorio"
}

export enum MedicLevel {
    "JUNIOR" = "Junior",
    "SPECIALIST" = "Especialista",
    "RESIDENT" = "Residente",
    "SENIOR" = "Senior"
}

export enum MedicJobPosition {
    "RESIDENT" = "Residente"
}