import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import VendorImgPrevDeleteCom from "./../Vendor/VendorImgPrevDelete";
import TermAndConCom from "./../Vendor/TermAndCon";
import TimingCom from "./../Vendor/Timing";
import OtpDialogCom from "./../Vendor/OtpDialog";
import VerifyFieldsFun from "./../Vendor/VerifyFields";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Tooltip,
	Fab,
	Divider,
  Autocomplete,
  Link,
  IconButton,
  Button,
} from "@mui/material";
import axios from "axios";
import { MdDoneAll, MdClearAll } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import AlertDialog from "./alertDialog";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const theme = createTheme();

export default function PrevPageCom() {
	const classes = useStyles();
	
	return (
        <Grid container>
        <Grid item xs={0} md={1}> </Grid>

        <Grid item xs={12} md={10}>
            <Paper className={classes.entryArea}>
                <form  style={{ maxWidth: "100vw" }}>
            
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
                    
                        
                        <span style={{flexGrow:1.1}}/>
                            
                                <Chip color="primary" label="Verify Vendor"  />
                                <span style={{flexGrow:1}}/>
                                
                                <IconButton color="primary" href="/GetVendor"  rel="noopener noreferrer">
                                <FindInPageIcon />

                                  </IconButton>
                            
                            <span style={{flexGrow:0.1}}/>
                        


                        </Grid>
                
                    
                    </Grid>				
                    
                    </form>
            </Paper>
        </Grid>
        
        <Grid item xs={0} md={1}> </Grid>

    </Grid>
		
	
	);
}
const allYearStablished2 = [ 
	"2000",
	"2001",
	"2002",
	"2003",
	"2004",
	"2005",
	"2006",
	"2007",
	"2008",
	"2009",
	"2010",
	"2011",
	"2012",
	"2013",
	"2014",
	"2015",
	"2016",
	"2017",
	"2018",
	"2019",
	"2020",
	"2021",
	"2022",
]
const allModesOfPayment2 = [
	"Cash","Online","Cheque","Card","Other"
]

const testData = [
  { label: 'The Shawshank Redemption', id: 1994 },
  { label: 'The Godfather', id: 1972 },
  { label: 'The Godfather: Part II', id: 1974 },
 
];