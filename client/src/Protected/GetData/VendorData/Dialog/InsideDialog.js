import React, { Fragment, useState, useEffect, useRef } from "react";
import MySnackbar from "../../../../Components/MySnackbar";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";

import useStyles from "../../../useStyles";
export default function InsideDialog(compo) {
  const snackRef = useRef();

	const [myId, setMyId] = useState(compo.compo._id);
	const [allData, setAllData] = useState([]);
	const [locationLink, setLocationLink] = useState("");
	const [visibility, setVisibility] = useState(
    { label: "", id: "" }
  );
	const [previousVisibility, setPreviousVisibility] = useState(
    { label: "", id: "" }
  );
  console.log(myId)
  useEffect(() => {
    getDataWithId();
  }, [myId]);

  const getDataWithId = async () => {

    await axios
      .get(`/api/v1/addition/vendor/oneData/${myId}`)
      .then((res) => (setAllData(res.data.myData), setVisibility(res.data.visibility),
      setLocationLink(res.data.locationLink), setPreviousVisibility(res.data.visibility)
      ))
      .catch((err) => console.log(err));

  };

  const updateVisibility = () => {
    let fieldData = {
      visibility: visibility
    }
    axios
      .post(`/api/v1/addition/vendor/updateVisibility/${myId}`,fieldData)
      .then((res) => (getDataWithId(),snackRef.current.handleSnack(res.data)))
      .catch((err) => console.log(err));
  
    };

    const classes = useStyles();
  return (
    <>
    <Grid container spacing={3} style={{marginTop:"4px"}}>
       <Grid item xs={0.5}>
         </Grid>
       <Grid item xs={11}>
         <Paper  className={classes.entryArea}>
         <Grid container spacing={2}> 
         <Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label="Verify Vendor"  />
									<span style={{flexGrow:1}}/>
                  
      
							
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>
             
              {allData.map((l, i) => (
                      < Grid item xs={12} sm={4} md={2.4} lg ={2}>  
        
                      <TextField
                        id="filled-read-only-input"
                        label={l.myKey}
                        defaultValue={l.myValue}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      /> 
                      </Grid>    
                
         ))}
           < Grid item xs={12} sm={4} md={2.4} lg ={2}> 
           
           <Button variant="outlined" target="_blank" href={locationLink} startIcon={<AddLocationAltIcon />}>
        Check Location On Map
      </Button>
                     </Grid>   
           < Grid item xs={12} sm={4} md={2.4} lg ={2}> 
           
              <Autocomplete
                  color="secondary"
                  disablePortal
                  id="combo-box-demo"
                  options={visibilityOption}
                  value={visibility}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, v) => {
                    setVisibility(v);
                    
                  }}
                  renderInput={(params) => <TextField {...params} label="Visibility" />}
                  />
                     </Grid>   
           {(previousVisibility.id !== visibility.id) && (< Grid item xs={12} sm={4} md={2.4} lg ={2}> 
           <Button 
            variant="contained" 
            color="success"
            onClick={() => updateVisibility()}
            >
                 Update Visibility
                </Button>
             </Grid> )}  
         </Grid>
         </Paper>
         </Grid>
       <Grid item xs={0.5}>
         </Grid>
         

          </Grid>
		<MySnackbar ref={snackRef} />

          </>
    
  );
}

const visibilityOption = [
  { label: 'Public', id: "public" },
  { label: 'Unlisted', id: "unlisted" },
  { label: 'Private', id: "private" },
  {label: 'Pending', id: "pending" },
]


