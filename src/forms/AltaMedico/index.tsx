import { Grid, 
    Stack,
    Button,
    TextField,
    Autocomplete,
    Chip } from '@mui/material';
import { CreateMedic, 
    MedicServices, 
    MedicSpecialty, 
    MedicLevel,
    MedicJobPosition } from '../../types/medic';
import { useDispatch } from '../../store';
import { openSnackbar } from '../../store/slices/snackbar';
import { gridSpacing } from '../../store/constant';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { createMedic } from '../../store/slices/medic'

const getInitialValues = () => {
    const newEvent: CreateMedic = {
        name: '',
        last_name_1: '',
        last_name_2: '',
        employee_number: '',
        profesional_licence: '',
        service: new Array,
        specialty: '',
        level: '',
        job_position: ''
    };
    return newEvent;
};

const AltaMedico = () =>{
    const dispatch = useDispatch();

    const MedicSchema  = Yup.object().shape({
        name: Yup.string().max(255).required('Campo requerido'),
        last_name_1: Yup.string().max(255).required('Campo requerido'),
        last_name_2: Yup.string().max(255),
        employee_number: Yup.string().max(255).required('Campo requerido'),
        profesional_licence: Yup.string().max(255).required('Campo requerido'),
        specialty: Yup.string().max(255).required("Debe seleccionar una especialidad"),
        service: Yup.array()
            .min(1, "Debe seleccionar al menos una especialidad")
            .required("Debe seleccionar al menos una especialidad"),
        level: Yup.string().max(255),
        job_position: Yup.string().max(255)
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: MedicSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data: CreateMedic = {
                    name: values.name,
                    last_name_1: values.last_name_1,
                    last_name_2: values.last_name_2 || null,
                    employee_number: values.employee_number,
                    profesional_licence: values.profesional_licence,
                    specialty: values.specialty,
                    service: values.service,
                    job_position: values.job_position || null,
                    level: values.level || null
                };
                const response = await createMedic(data);
                console.log({response})
                if ( response?.status === 201 ){
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Médico Creado',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                } else {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `Error: ${response?.data.status}: ${response?.data?.errors[0]?.message}`,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    );
                }
                resetForm();
                setSubmitting(false);
            } catch (error) {
                console.error(error);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: `Error: ${error}`,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    });
    
    const servicesArray = Object.entries(MedicServices).map(([key, value]) => ({
        key,
        label: value
    }));
    const specialtiesArray = Object.entries(MedicSpecialty).map(([key, value]) => ({
        key,
        label: value
    }));
    const job_positionArray = Object.entries(MedicJobPosition).map(([key, value]) => ({
        key,
        label: value
    }));
    const medic_levelArray = Object.entries(MedicLevel).map(([key, value]) => ({
        key,
        label: value
    }));
    
    const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} autoComplete="off" noValidate >
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
                        <Autocomplete
                            options={specialtiesArray}
                            getOptionLabel={(option) => option.label} // Muestra valores en español
                            value={specialtiesArray.find((s) => s.key === values.specialty) || null}
                            onChange={(event, selectedOption) => {
                                setFieldValue("specialty", selectedOption?.key || "");
                              }}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => {
                                  const { key, ...tagProps } = getTagProps({ index }); // Extrae la clave key antes de aplicar spread
                                  return <Chip key={option.key} label={option.label} {...tagProps} />;
                                })
                            }   
                            renderInput={(params) => <TextField {...params} 
                                label="Especialidad Médica" 
                                error={touched.specialty && !!errors.specialty}
                                helperText={touched.specialty && errors.specialty}
                            />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Autocomplete
                            multiple
                            options={servicesArray}
                            getOptionLabel={(option) => option.label} // Muestra valores en español
                            value={values.service.map((key) => servicesArray.find((s) => s.key === key) || { key, label: key })}
                            onChange={(event, selectedOptions) => {
                                setFieldValue("service", selectedOptions.map((option) => option.key)); // Guarda las claves
                              }}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => {
                                  const { key, ...tagProps } = getTagProps({ index }); // Extrae la clave key antes de aplicar spread
                                  return <Chip key={option.key} label={option.label} {...tagProps} />;
                                })
                            }   
                            renderInput={(params) => <TextField {...params} 
                                label="Servicios Médicos" 
                                error={touched.service && !!errors.service}
                                helperText={touched.service && errors.service}
                            />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Autocomplete
                            options={job_positionArray}
                            getOptionLabel={(option) => option.label} // Muestra valores en español
                            value={job_positionArray.find((s) => s.key === values.job_position) || null}
                            onChange={(event, selectedOption) => {
                                setFieldValue("job_position", selectedOption?.key || "");
                              }}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => {
                                  const { key, ...tagProps } = getTagProps({ index }); // Extrae la clave key antes de aplicar spread
                                  return <Chip key={option.key} label={option.label} {...tagProps} />;
                                })
                            }   
                            renderInput={(params) => <TextField {...params} 
                                label="Puesto" 
                                error={touched.job_position && !!errors.job_position}
                                helperText={touched.job_position && errors.job_position}
                            />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Autocomplete
                            options={medic_levelArray}
                            getOptionLabel={(option) => option.label} // Muestra valores en español
                            value={medic_levelArray.find((s) => s.key === values.level) || null}
                            onChange={(event, selectedOption) => {
                                setFieldValue("level", selectedOption?.key || "");
                              }}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => {
                                  const { key, ...tagProps } = getTagProps({ index }); // Extrae la clave key antes de aplicar spread
                                  return <Chip key={option.key} label={option.label} {...tagProps} />;
                                })
                            }   
                            renderInput={(params) => <TextField {...params} 
                                label="Nivel" 
                                error={touched.level && !!errors.level}
                                helperText={touched.level && errors.level}
                            />}
                        />
                    </Grid>
                </Grid>
                <Grid  size={{ xs: 12 }} spacing={gridSpacing} sx={{ p: 2.5 }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="contained" type="submit" disabled={isSubmitting} >
                                Guardar
                        </Button>
                    </Stack>
                </Grid>
            </Form>
        </FormikProvider>
    )
}

export default AltaMedico;