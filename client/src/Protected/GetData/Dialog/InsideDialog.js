import React, { Fragment, useState, useEffect, useRef } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, Grid, Paper } from '@mui/material';
import axios from "axios";

import useStyles from "../../useStyles";
export default function InsideDialog(compo) {
	const [myId, setMyId] = useState(compo.compo._id);
	const [allData, setAllData] = useState([]);
	const [visibility, setVisibility] = useState(
    { label: "", id: "" }
  );
  console.log(myId)
  useEffect(() => {
    getDataWithId();
  }, [myId]);

  const getDataWithId = async () => {

    await axios
      .get(`/api/v1/addition/vendor/oneData/${myId}`)
      .then((res) => (setAllData(res.data.myData), setVisibility(res.data.visibility)))
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
              <Autocomplete
                  color="secondary"
                  disablePortal
                  id="combo-box-demo"
                  options={visibilityOption}
                  value={visibility}
                  renderInput={(params) => <TextField {...params} label="Visibility" />}
                  />
                     </Grid>   
         </Grid>
         </Paper>
         </Grid>
       <Grid item xs={0.5}>
         </Grid>
         

          </Grid>
          </>
    
  );
}

const visibilityOption = [
  { label: 'Public', id: "public" },
  { label: 'Unlisted', id: "unlisted" },
  { label: 'Private', id: "private" },
  {label: 'Pending', id: "pending" },
]


