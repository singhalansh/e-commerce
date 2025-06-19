import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import  { DataContext } from '../../context/DataProvider';

export default function Profile({account}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { setAccount } = React.useContext(DataContext);
    const logoutuser = () => {
        setAccount('');
        handleClose();
    };
return (
    <div
        onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
        onMouseLeave={handleClose}
    >
        <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '999px', padding: '8px 16px', display: 'inline-block' }}>
            <h1 className="capitalize font-semibold text-amber-200">{account}</h1>
        </div>
        <Menu
            id="hover-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'hover-menu',
                onMouseLeave: handleClose,
            }}
        >
            <MenuItem onClick={handleClose}>
                <Button
                    onClick={() => logoutuser()}
                >
                    <PowerSettingsNewIcon style={{ marginRight: '8px' }} />
                    Logout
                </Button>
            </MenuItem>
        </Menu>
    </div>
);
}
