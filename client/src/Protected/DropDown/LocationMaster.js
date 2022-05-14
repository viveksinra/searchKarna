import React, { Fragment, useState, useEffect, useRef } from "react";
// import useStyles from "../../Protected/useStyles";
import MySnackbar from "../../Components/MySnackbar";
import {
    Grid,
    TextField,
    Backdrop,
    LinearProgress,
    Box,
    Typography,
    Button
} from "@mui/material";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../MyDashboard/CommonDash"
import AlertDialog from "./../Addition/Vendor/alertDialog";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { makeStyles } from '@mui/styles';
const theme = createTheme();

const useStyles = makeStyles(() => ({
	dashbody: {
		height: "100vh",
      display: 'flex',
      background: "linear-gradient(to right, #e6bd03, #d1cd00, #b3dd00, #86ec00, #26fb0f)",
		
	},
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        
      },
    content:{
        flexGrow: 1,
    },
    cardArea:{
        background: "linear-gradient(to right, #e6bd03, #d1cd00, #b3dd00, #86ec00, #26fb0f)",
        minHeight:400,
        padding:theme.spacing(2),
    },
    importBox:{
        background:"white",
        borderRadius:20,


       
    }
 
}));
export default function LocationMaster() {
  const classes = useStyles();
  const [file, setFile]= useState({});
  const [progress,setProgress]=useState(0)
  const [loading, setLoading] = useState(false);
  const snackRef = useRef();


  const handleLeads = async (e) => {
      e.preventDefault();
        setProgress(0);
  if (file) {
    const selectedFile = file;
    const fileData = new FormData();
    fileData.append("photo", selectedFile, selectedFile.name);
    
          await axios
      .post(`/api/v1/dropDown/location/uploadLocation/check`, fileData, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${fileData._boundary}`,
        },
              onUploadProgress: data => {
                      //Set the progress value to show the progress bar
                      setProgress(Math.round((100 * data.loaded) / data.total))
                    },
      })
      .then((res) => {snackRef.current.handleSnack(res.data);setLoading(false)})
      .catch((err) => {console.log(err);setLoading(false)});
  }
};
	return (
		<>
		<CommonDash compo = {
			<Fragment >
       <div className={classes.cardArea}>
            <Grid container spacing={4}>
                <Grid item xs={12} style={{display:"flex",justifyContent:"flex-end"}}>
     
                <Button onClick={()=>alert("Download Sample")}  color="primary" >
		            	Sample
		        		</Button>
                </Grid>

                <Grid item xs={12}>
                    {
                progress !== 0 && 
                <>
                <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>   
    <br/>   
    </>
            }
                </Grid>
               <Grid item xs={12} className={classes.importBox}>
               <form onSubmit={(e) => handleLeads(e)} className="center">
               <TextField
			      		variant="outlined"
					      type="file"
					      InputLabelProps={{ shrink: true }}
					      inputProps={{ accept: ".csv,application/vnd.ms-excel/*" }}										
					      label="Import Location "
                required
                onChange={e=> setFile(e.target.files[0])}
				      	/>
                    <span style={{flexGrow:0.05}}/>
                <Button type="submit" variant="contained" color="primary">
						    	Import
					      </Button>
              </form>
              
        
               </Grid>
             
            </Grid>
            </div>

	
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}