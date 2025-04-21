import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from '../../../config';
import logo from '../../../assets/images/logo-traxion.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH}>
        <img src={logo} alt="Traxión - Tu vida en movimiento" height={"40px"} />
    </Link>
);

export default LogoSection;
