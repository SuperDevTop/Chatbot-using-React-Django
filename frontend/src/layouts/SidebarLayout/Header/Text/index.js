import { Box, Typography } from '@mui/material';

const HeaderText = () => {
  return (
    <Box display="flex">
      <Typography sx={{ color: '#265A9E', fontSize: 30 }}>OneDollar</Typography>
      <Typography sx={{ fontSize: 30, color: '#0000ff' }}>AI</Typography>
    </Box>
  );
};

export default HeaderText;
