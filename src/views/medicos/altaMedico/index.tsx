// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-components/cards/SubCard';
import MainCard from '../../../ui-components/cards/MainCard';


// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// constant
const getInitialValues = () => {
    const newEvent = {
        umu_id: 'd2cf9ae4-52fe-4c1b-b6c1-d22f378fcc22',
        name: '',
        last_name_1: '',
        employee_number: '',
        profesional_licence: '',
        specialty: '',
        status: '',
        service: []
    };

    return newEvent;
};



const AltaMedico = () => {

    const EventSchema = Yup.object().shape({
        umu_id: Yup.string().max(255).required('Title is required'),
        name: Yup.string().max(255),
        last_name_1: Yup.string().max(255),
        employee_number: Yup.string().max(255),
        profesional_licence: Yup.string().max(255),
        specialty: Yup.string().max(255),
        status: Yup.string().max(255)
    });
    
    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = {
                    umu_id: values.umu_id,
                    name: values.name,
                    last_name_1: values.last_name_1,
                    employee_number: values.employee_number,
                    profesional_licence: values.employee_number,
                    specialty: values.specialty,
                    status: values.status,
                    service: values.service
                };
                resetForm();
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });
    
    
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
