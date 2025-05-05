// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-components/cards/SubCard';
import MainCard from '../../../ui-components/cards/MainCard';

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
