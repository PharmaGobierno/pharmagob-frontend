// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
/* import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection'; */
/* import { useDispatch, useSelector } from '../../../store';
import { openDrawer } from '../../../store/slices/menu';
 */
// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

/*     const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu); */

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </Box>

            {/* header search */}
            <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <ProfileSection /> */}

            {/* mobile header */}
            {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
        </>
    );
};

export default Header;
