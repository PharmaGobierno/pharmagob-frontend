import { Grid, 
    Stack,
    Button,
    TextField,
    Autocomplete 
} from '@mui/material';
import { CreatePatient } from '../../types/patient'
import { gridSpacing } from '../../store/constant';


// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

const getInitialValues = () => {
    const newEvent: CreatePatient = {
        curp: ''
    };

    return newEvent;
};

const AltaPaciente = () => {

    const PatientSchema  = Yup.object().shape({
        curp: Yup.string().max(255).required('Campo requerido'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: PatientSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            console.log({values})
            try {
                const data: CreatePatient = {
                    curp: values.curp,
                };
                console.log({data})
                /* createPatient(data); */
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
            <form onSubmit={handleSubmit} autoComplete="off" noValidate >
                <Grid container spacing={gridSpacing}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="CURP"
                            {...getFieldProps('curp')}
                            error={Boolean(touched.curp && errors.curp)}
                            helperText={touched.curp && errors.curp}
                            required
                        /> 
                    </Grid>
                    {/* TODO: selects faltantes*/}
                </Grid>
                <Grid  size={{ xs: 12 }} spacing={gridSpacing} sx={{ p: 2.5 }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="contained" type="submit" disabled={isSubmitting}>
                                Guardar
                        </Button>
                    </Stack>
                </Grid>
            </form>
        </FormikProvider>
    )
}


export default AltaPaciente