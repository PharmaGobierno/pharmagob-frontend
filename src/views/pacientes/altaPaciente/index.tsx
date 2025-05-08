// material-ui
import { Grid, Divider } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-components/cards/SubCard';
import MainCard from '../../../ui-components/cards/MainCard';
import AltaPaciente from '../../../forms/AltaPaciente';

const sxDivider = {
    borderColor: 'text.secondary'
};

const AltaMedico = () => {
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid size={{ xs: 12 }} >
                    <SubCard title="Alta de paciente" >
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={sxDivider} />
                            
                        </Grid>
                        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
                            <Grid size={{ xs: 12 }}>
                                <AltaPaciente/>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AltaMedico;
