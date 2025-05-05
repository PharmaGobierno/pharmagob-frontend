// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-components/cards/SubCard';
import MainCard from '../../../ui-components/cards/MainCard';

const AltaMedico = () => {    
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12 }} >
                    <SubCard title="Alta de paciente " >
                        test
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AltaMedico;
