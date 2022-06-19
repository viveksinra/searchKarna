import  React, {useState} from 'react';
import useStyles from "../../useStyles";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
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
  FormGroup,
  FormControlLabel,
  Checkbox,

} from "@mui/material";
import { Stack } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimingCom({cState,setIsTandCAccepted,handleCheck}) {
  const [monday, setMonday] = useState(false);
const [opTime, setOpTime] = useState(
  [
      {
          sunday:[{startTime:"09:00",endTime:"20:00"}],
          sundayStatus:false,
      },
      {
          monday:[{startTime:"09:00",endTime:"20:00"}],
          mondayStatus:true,
      },
    {
        tuesday:[{startTime:"09:00",endTime:"20:00"}],
        tuesdayStatus:true,
    },
    {
        wednesday:[{startTime:"09:00",endTime:"20:00"}],
        wednesdayStatus:true,
    },
    {
        thursday:[{startTime:"09:00",endTime:"20:00"}],
        thursdayStatus:true,
    },
    {
        friday:[{startTime:"09:00",endTime:"20:00"}],
        fridayStatus:true,
    },
    {
        saturday:[{startTime:"09:00",endTime:"20:00"}],
        saturdayStatus:true,
    }
    
  ]);

  const [open, setOpen] = useState(false);
  const checkBeforeOpen = () => {
      handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
const setStartTime = (day,index,dayName,startTime) => {
    let newOpTime = opTime;
    console.log(newOpTime[day][dayName][index].startTime);
    newOpTime[day][dayName][index].startTime = startTime;
    setOpTime(newOpTime);
}
const setEnd = (day,index,dayName,endTime) => {
    let newOpTime = opTime;
    newOpTime[day].opTime[index].endTime = endTime;
    setOpTime(newOpTime);
}
const setOpTimeStatus = (day,dayName,status) => {
    let newOpTime = opTime;
    newOpTime[day][dayName] = status;
    setOpTime(newOpTime);
}
const setOpTimeStatusAll = (day,status) => {
    let newOpTime = opTime;
    newOpTime[day].status = status;
    setOpTime(newOpTime);
}
const setOpTimeAll = (day,startTime,endTime) => {
    let newOpTime = opTime;
    newOpTime[day].opTime = [{startTime:startTime,endTime:endTime}];
    setOpTime(newOpTime);
}
  return (
    <div>
      <Button variant="outlined" onClick={checkBeforeOpen} color="success">
       Select Hour of Operation
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
              Select Timing
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>

           		<Grid container>
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form onSubmit={(e) => console.log(e)} style={{ maxWidth: "100vw" }}>
				
						<Grid container spacing={2}>
							
							<Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label="Hour of Operation"  />
									<span style={{flexGrow:1}}/>
									
									<IconButton color="primary" href="/GetVendor"  rel="noopener noreferrer">

  									</IconButton>
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>

              
              <Grid item xs={12} md={6}>  
              <FormGroup>
              <FormControlLabel 
              control={
              <Checkbox 
              value={opTime[1].mondayStatus} 
              onChange={() => { setMonday(!monday); setOpTimeStatusAll(0,monday); }}
               />} 
              
              label={`Monday -  ${monday ? "Opens": "Closed"}`} />
             </FormGroup>
             <TextField type="time" 
             value={opTime[1].monday[0].startTime}
              onChange={(e) => setStartTime(1,0,"monday",e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}

                label="Start Time"
              />
             <TextField type="time" 
             value={opTime[1].monday[0].endTime}
              onChange={(e) => setStartTime(1,0,"monday",e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}

                label="End Time"
              />

            

							</Grid>   	
        
						</Grid>				
						
						</form>
				</Paper>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>

		</Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="outlined" color="error">
            Disagree
          </Button>
          <Button variant="contained" color="success" onClick={() => {
            setIsTandCAccepted(true);
            console.log("hello1")}}>
          Agree
      </Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}


