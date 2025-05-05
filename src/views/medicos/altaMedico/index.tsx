// material-ui
import { Grid } from '@mui/material';

// project imports
import axios from '../../../utils/axios';
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-components/cards/SubCard';
import MainCard from '../../../ui-components/cards/MainCard';
import { CreateMedic, 
        MedicServices, 
        MedicSpeciality, 
        MedicStatus, 
        VALID_STATUSES, 
        MedicLevel,
        MedicJobPosition } from '../../../types/medic'

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';
import { useEffect } from 'react';

// constant
const getInitialValues = () => {
    const newEvent: CreateMedic = {
        umu_id: 'd2cf9ae4-52fe-4c1b-b6c1-d22f378fcc22',
        name: 'Mario',
        last_name_1: 'Salvador',
        employee_number: '234234',
        profesional_licence: '457568543',
        speciality: MedicSpeciality.GENERAL_MEDICINE,
        status: VALID_STATUSES[0],
        service: [MedicServices.LABORATORY]
    };

    return newEvent;
};

const AltaMedico = () => {

    const createMedic = async (data: CreateMedic) => {
        try {
            const response = await axios.post(`/v1/doctors`, data);
            console.log({response})
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }

    const EventSchema  = Yup.object().shape({
        umu_id: Yup.string().max(255).required('Title is required'),
        name: Yup.string().max(255),
        last_name_1: Yup.string().max(255),
        employee_number: Yup.string().max(255),
        profesional_licence: Yup.string().max(255),
        status: Yup.mixed<MedicStatus>()
            .oneOf(Object.values(VALID_STATUSES), 'Estatus inválido')
            .required('El estatus es obligatorio'),
        speciality: Yup.mixed<MedicSpeciality>()
            .oneOf(Object.values(MedicSpeciality), 'Especialidad médica inválida')
            .required('La especialidad médica es obligatoria'),
        service: Yup.array()
            .of(Yup.string().oneOf(Object.values(MedicServices), 'Servicio inválido'))
            .min(1, 'Debes seleccionar al menos un servicio'),    
        level: Yup.mixed<MedicLevel>().oneOf(Object.values(MedicLevel), 'inválido'),
        job_position:  Yup.mixed<MedicJobPosition>().oneOf(Object.values(MedicJobPosition), 'inválido'),
    });
    
    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data: CreateMedic = {
                    umu_id: values.umu_id,
                    name: values.name,
                    last_name_1: values.last_name_1,
                    last_name_2: values.last_name_2,
                    employee_number: values.employee_number,
                    profesional_licence: values.employee_number,
                    speciality: values.speciality,
                    service: values.service,
                    status: values.status,
                };
                createMedic(data);
                resetForm();
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    useEffect(()=>{
        createMedic(getInitialValues());
    }, [])
    
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12 }} >
                    <SubCard title="Alta de paciente" >
                        test
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AltaMedico;
