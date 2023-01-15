import { Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPerson from '../component/CardPerson';
import { goToStatusCode } from '../router/coordinator';

import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardTabSharpIcon from '@mui/icons-material/KeyboardTabSharp';


const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a'
    }
  }
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type Users = {
  picture: { thumbnail: string };
  name: { title: string };
  email: string;
  login: { uuid: string, username: string };
  dob: { age: number };
};

const UsersPage = () => {
  const [listUsers, setLisUsers] = useState<Users[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);


  const navigate = useNavigate();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?page=${currentPage}&results=12&seed=abc`)
      .then((response) => {
        setLisUsers(response.data.results);
      })
      .catch((err) => {
        console.log("Deu erro", err.response)
      })
  }, [currentPage])

  const lowerSearch = search.toLowerCase();

  const usersFilters = listUsers.filter((user) =>
    user.email.toLowerCase().includes(lowerSearch) ||
    user.name.title.toLowerCase().includes(lowerSearch) ||
    user.login.username.toLowerCase().includes(lowerSearch)

  )

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={() => goToStatusCode(navigate)}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <KeyboardTabSharpIcon />
        </IconButton>
        <p>Status Code Cat</p>
      </MenuItem>
    </Menu>
  );


  const render = (usersFilters || []).map((list) => {
    return (
      <CardPerson
        key={list.login.uuid}
        list={list}
      />
    )
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Usuários
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  type="text"
                  value={search}
                  onChange={(ev) => setSearch(ev.target.value)}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => goToStatusCode(navigate)}
                  color="inherit"
                >
                  <KeyboardTabSharpIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
        </Box>
      </ThemeProvider>
      <div className='grid grid-cols-4'>
        {render}
      </div>
      <div className='flex flex-col items-center '>
        <Pagination
          count={10}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default UsersPage;