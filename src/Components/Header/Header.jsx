import React from 'react';
import {Autocomplete} from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';



import useStyles from './Styles';



const Header = ({onPlaceChanged, onLoad }) => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            
          <Toolbar className={classes.toolbar}>
          <Box display="flex">
              <Typography variant="h6" className={classes.title}>
                
              </Typography>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div> 
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                </div>
              </div> 
              </Autocomplete>
              
            </Box>
            <Typography variant="h5" className={classes.title}>
              ICU Capacity Map
            </Typography>
            
            
           
          </Toolbar>
        </AppBar>
      );
    };

export default Header;