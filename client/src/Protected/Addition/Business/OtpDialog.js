import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import axios from "axios";

import {
	Grid,
	Paper,
	Chip,
  TextField,
  Alert,

} from "@mui/material";

import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OtpDialogCom({cState,contactNo1,callOtpFun,handleCheck}) {
	const classes = useStyles();
	const snackRef = useRef();

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const checkBeforeOpen = () => {
    let checkMsg = handleCheck()
    if(checkMsg.variant === "success"){
      handleClickOpen();
    }
  }
  const sendOtpFun = async (number) => {
		// handleOpen();
		let myValue = { contactNo1: contactNo1 };
		await axios
			.post(`/api/v1/other/sendVerifyOtp/sendOtp`, myValue)
			.then((res) => {				
				// handleClose()
        setShowAlert(true);
        setAlertMessage(res.data.message);
        setAlertType(res.data.variant);
				if(res.data.variant==="success"){
					setIsOtpSent(true);         
				}
			})
			.catch((err) => console.log(err));
	};
  const verifyOtpFun = async (number,ourOtp) => {
		// handleOpen();
		let myValue = { 
      contactNo1: number,
      otp:ourOtp
     };
		await axios
			.post(`/api/v1/other/sendVerifyOtp/verifyOtp`, myValue)
			.then((res) => {				
        setShowAlert(true);
        setAlertMessage(res.data.message);
        setAlertType(res.data.variant);
				if(res.data.variant==="success"){
					callOtpFun(otp,true); 
          handleClose()        
				}
			})
			.catch((err) => console.log(err));
	};

  const [open, setOpen] = useState(cState);  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Button variant="outlined" onClick={checkBeforeOpen} color="success">
   Verify otp
    </Button>
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" >
              Verify OTP
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
      	<Fragment>
		<Grid container>
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
					<form onSubmit={(e) => {}} style={{ maxWidth: "100vw" }}>
				
						<Grid container spacing={2}>
            <Grid item xs={12} style={{alignItems:"center", marginTop:"4px"}}>
              
            <center>
									<Chip color="primary" label="Otp will be sent to below mobile number" />
								</center>
                {(showAlert)&&(<center>
                <Alert style={{marginTop:"4px"}}
                  severity={alertType} variant="filled" color={alertType}>
                {alertMessage}
              </Alert></center>)}
            </Grid>
                  <Grid item xs={12}  style={{alignItems:"center",}}>
               
                  <center>
                  <TextField
                  id="filled-read-only-input"
                  label="Mobile number"
                 value={contactNo1}
                 InputProps={{
                   readOnly: true,
                 }}
                 variant="filled"
                 />                 
               
								  </center>
              	</Grid>	
                  {(!isOtpSent)&&(<Grid item xs={12}  style={{alignItems:"center",}}>
                  <center>
                  <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => {sendOtpFun(contactNo1)}}
                  >
                  Send OTP
                   </Button>
								  </center>
              	</Grid>	)}
                  {(isOtpSent)&&(<Grid item xs={12}  style={{alignItems:"center",}}>
                  <center>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value) }}
                  />
								  </center>
              	</Grid>		)}
                  {(isOtpSent)&&(<Grid item xs={12}  style={{alignItems:"center",}}>
                  <center >
                  <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => {setIsOtpSent(false)}}
                  >
                  GO Back
                   </Button>
                  <Button 
                  variant="contained" 
                  color="success" 
                  style={{marginLeft:"4px"}}
                  onClick={() => {verifyOtpFun(contactNo1,otp)}}
                  >
                  Verify OTP
                   </Button>
                 
								  </center>
              	</Grid>		)}
                  

              	</Grid>				
						</form>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>

		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>
  </Dialog>
    </div>
  );
}




