import { Grid, 
    Stack,
    InputLabel,
    TextField } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import { CreateMedic, 
    MedicServices, 
    MedicSpeciality, 
    MedicStatus, 
    VALID_STATUSES, 
    MedicLevel,
    MedicJobPosition } from '../../types/medic'

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';
import { createMedic } from '../../store/slices/medic'

const getInitialValues = () => {
    const newEvent: CreateMedic = {
        umu_id: 'd2cf9ae4-52fe-4c1b-b6c1-d22f378fcc22',
        name: 'Mario',
        last_name_1: 'Salvador',
        employee_number: '234234',
        profesional_licence: '457568543',
        specialty: Object.keys(MedicSpeciality)[0] as keyof typeof MedicSpeciality, 
        service: [Object.keys(MedicServices)[0] as keyof typeof MedicServices]
    };

    return newEvent;
};

const AltaMedico = () =>{

    const MedicSchema  = Yup.object().shape({
        name: Yup.string().max(255).required('Campo requerido'),
        last_name_1: Yup.string().max(255).required('Campo requerido'),
        last_name_2: Yup.string().max(255),
        employee_number: Yup.string().max(255).required('Campo requerido'),
        profesional_licence: Yup.string().max(255).required('Campo requerido'),
        specialty: Yup.mixed<MedicSpeciality>()
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
        validationSchema: MedicSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data: CreateMedic = {
                    name: values.name,
                    last_name_1: values.last_name_1,
                    last_name_2: values.last_name_2,
                    employee_number: values.employee_number,
                    profesional_licence: values.profesional_licence,
                    specialty: Object.keys(MedicSpeciality).find(key => MedicSpeciality[key as keyof typeof MedicSpeciality] === values.specialty) as MedicSpeciality,
                    service: values.service.map(service => Object.keys(MedicServices).find(key => MedicServices[key as keyof typeof MedicServices] === service) as MedicServices),
                };
                createMedic(data);
                resetForm();
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, handleBlur, handleChange } = formik;

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Nombre(s)"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                            required
                        /> 
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Apellido paterno"
                            {...getFieldProps('last_name_1')}
                            error={Boolean(touched.last_name_1 && errors.last_name_1)}
                            helperText={touched.last_name_1 && errors.last_name_1}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Apellido materno"
                            {...getFieldProps('last_name_2')}
                            error={Boolean(touched.last_name_2 && errors.last_name_2)}
                            helperText={touched.last_name_2 && errors.last_name_2}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="No. Empleado"
                            {...getFieldProps('employee_number')}
                            error={Boolean(touched.employee_number && errors.employee_number)}
                            helperText={touched.employee_number && errors.employee_number}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Cédula Profesional"
                            {...getFieldProps('profesional_licence')}
                            error={Boolean(touched.profesional_licence && errors.profesional_licence)}
                            helperText={touched.profesional_licence && errors.profesional_licence}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="No. Empleado"
                            {...getFieldProps('employee_number')}
                            error={Boolean(touched.employee_number && errors.employee_number)}
                            helperText={touched.employee_number && errors.employee_number}
                        />
                    </Grid>
                    {/* TODO: selects faltantes*/}
                </Grid>
            </form>
        </FormikProvider>
    )
}

export default AltaMedico;