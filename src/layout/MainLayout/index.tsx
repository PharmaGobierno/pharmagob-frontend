import React, { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
/* import { openDrawer } from '../../store/slices/menu';
import { useDispatch, useSelector } from '../../store'; */


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
/*     const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
 */
 /*    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu); */

/*     React.useEffect(() => {
        dispatch(openDrawer(!matchDownMd));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]); */

    const header = useMemo(
        () => (
            <Toolbar>
                <Header />
            </Toolbar>
        ),
        []
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
/*                 sx={{
                    bgcolor: theme.palette.background.default,
                    transition: drawerOpen ? theme.transitions.create('width') : 'none'
                }} */
            >
                {header}
            </AppBar>
        </Box>
    );
};

export default MainLayout;
