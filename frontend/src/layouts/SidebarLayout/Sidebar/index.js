import { useContext } from 'react';
// import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import SidebarContent from 'src/content/applications/Messenger/SidebarContent';

import {
  Box,
  Drawer,
  // alpha,
  styled,
  Divider,
  useTheme,
  // Button,
  // lighten,
  // darken
  // Typography
} from '@mui/material';

// import SidebarMenu from './SidebarMenu';
// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        // padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <Drawer
        sx={{
          // boxShadow: `${theme.sidebar.boxShadow}`,
          background: `${theme.colors.alpha.black[30]}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            // background:
            //   theme.palette.mode === 'dark'
            //     ? theme.colors.alpha.white[100]
            //     : darken(theme.colors.alpha.black[100], 0.5)
            background: `${theme.colors.alpha.black[30]}`
          }}
        >
          {/* <Scrollbar> */}
          <Box mt={3}>
            <Box
              mx={2}
              // sx={{
              //   width: 52
              // }}
            >
              {/* <Logo />
                <Typography>Test</Typography> */}
              <SidebarContent />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          {/* <SidebarMenu /> */}
          {/* </Scrollbar> */}
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
