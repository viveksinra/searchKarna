import  React ,{useRef,useEffect, useState,lazy,Suspense} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CommonDash from './../../../Protected/MyDashboard/CommonDash';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";

import { Autocomplete, TextField, Card,
     Accordion, AccordionSummary,
     Typography, FormControlLabel,
     Switch, AccordionDetails,

        Button, Dialog, DialogTitle, 
        DialogContent, DialogContentText,
         DialogActions,
         Chip,
         Link,
    
    } from '@mui/material';
import { FcExpand,FcSearch,FcRefresh,FcSurvey,FcCloseUpMode,FcClock,FcWorkflow } from "react-icons/fc";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullScreenDialog from './Dialog/DialogTemp';
import InsideDialog from './Dialog/InsideDialog';
const useStyles = styled((theme) => ({
	dashbody: {
		height: "100vh",
        display: 'flex',
	},
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
    content:{
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    workArea:{
        padding:theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));


export default function DataTable() {
    
    const [tableData,setTableData]=useState([]);

    const [expandBasic,setExpand]=useState(true);
    const [showAdv,setAdv]=useState(true);
    let todayDate = new Date()
    let date = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    if(month<=9){
      month = "0"+month;
    }
    let year = todayDate.getFullYear();
    let formatDate = year + "-" + month + "-" + date;
    const [startDate, setStartDate] = React.useState(formatDate);
    const [endDate, setEndDate] = React.useState(formatDate);
    const [visibility, setVisibility] = useState(
      { label: "", id: "" }
    );
    const [supervisor,setSupervisor]=useState(
      {name:"",_id:""}
    );
    const [allSupervisor,setAllSupervisor]=useState([]);
    const [fieldPartner,setFieldPartner]=useState(
      {name:"",_id:""}
    );
    const [allFieldPartner,setAllFieldPartner]=useState([]);
    const [state, setState] = useState("");
  	const [allStates, setAllStates] = useState([]);
  	const [district, setDistrict] = useState("");
  	const [allDistricts, setAllDistricts] = useState([]);
    const [exportId,setExportId]=useState("");
    
    useEffect(() => {
      getTableData();
      getState();
      getSupervisors();
    }, []);
    const getSupervisors = () => {
      console.log("getSupervisors");
			let fieldData = {}
			axios
				.post(`/api/v1/auth/getDeleteUser/allSupervisors`,fieldData)
				.then((res) => setAllSupervisor(res.data))
				.catch((err) => console.log(err));
			};
		const getFpWithSupervisor = (supervisorId) => {
			let fieldData = {
				supervisorId: supervisorId._id,
        "Data":"pata"
			}
			axios
				.post(`/api/v1/auth/getDeleteUser/userWithSupervisor`,fieldData)
				.then((res) => setAllFieldPartner(res.data))
				.catch((err) => console.log(err));
		
			};
    const getState = () => {
			let fieldData = {}
			axios
				.post(`/api/v1/dropDown/location/getLocation/state`,fieldData)
				.then((res) => setAllStates(res.data))
				.catch((err) => console.log(err));
			};
		const getDistrict = (state) => {
			let fieldData = {
				state: state
			}
			axios
				.post(`/api/v1/dropDown/location/getLocation/district`,fieldData)
				.then((res) => setAllDistricts(res.data))
				.catch((err) => console.log(err));
		
			};
    const getTableData = async (word) => {
      let dataToSend = {
 
      }
      await axios
        .post(`/api/v1/addition/business/getBusiness/withoutFilterData`,dataToSend)
        .then((res) => (setTableData(res.data)))
        .catch((err) => console.log(err));
    };
    const getTableDataWithFiter = async(word) => {
      let dataToSend = {
        startDate:startDate,
        endDate:endDate,
        visibility:visibility,
        supervisor:supervisor,
        fieldPartner:fieldPartner,
        state:state,
        district:district
      }
      console.log({word,dataToSend})
      await axios
        .post(`/api/v1/addition/business/getBusiness/filterData`,dataToSend)
        .then((res) => (setTableData(res.data)))
        .catch((err) => console.log(err));
    };
    const exportBusinessData = async(word) => {
      console.log("exportBusinessData");
      let dataToSend = {
        startDate:startDate,
        endDate:endDate,
        visibility:visibility,
        supervisor:supervisor,
        fieldPartner:fieldPartner,
        state:state,
        district:district
      }
      console.log({word,dataToSend})
      await axios
        .post(`/api/v1/addition/business/exportBusiness/createExportId`,dataToSend)
        .then((res) => (setExportId(res.data.id)))
        .catch((err) => console.log(err));
    };


    const classes = useStyles();
  return (
    <CommonDash compo = 
    {
        <>
             <Grid container spacing={2}>  

                <Grid item xs={12}>
            
                <Card className={classes.workArea}>
                  <div style={{display:"flex",justifyContent:"center"}}> 
                <Chip style={{marginBottom:"4px"}} color="primary" label="View Listings"  />    
                </div>

                <Accordion expanded={expandBasic}>
        <AccordionSummary
        onClick={()=>setExpand(!expandBasic)}
          expandIcon={<FcExpand />}
          aria-controls="basic-filter"
          id="basic-filter"
        >
  
          <span style={{flexGrow:0.5}}/>
          <FormControlLabel
        control={<Switch color="secondary" checked={showAdv} onChange={() => {setAdv(!showAdv);setExpand(true)}} />}
        label={showAdv?"Advance Filter":"Basic Filter"} labelPlacement="start"
      />
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={startDate} required={false} onChange={e=>(setStartDate(e.target.value),setEndDate(e.target.value))} inputProps={{ max:formatDate,min:"2022-01-11"}} InputLabelProps={{ shrink: true }}  label="Start Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={endDate} required={false} onChange={e=>(setEndDate(e.target.value))} inputProps={{ max:formatDate,min:startDate}} InputLabelProps={{ shrink: true }}  label="End Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
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
        
            {showAdv && <>
        
            {/* data --- supervisor	 */}
            <Grid item xs={12} md={3}> 
			  <Autocomplete
										
										options={allSupervisor}
										filterSelectedOptions
										getOptionLabel={(option) => option.name}
										isOptionEqualToValue={(option, value) => (option.name === value.name )}
										onChange={(e, v) => {
                      console.log({e,v});
											setSupervisor(v);
											setAllFieldPartner([]);
											setFieldPartner({name:"",id:""});
											getFpWithSupervisor(v);
										}}
										value={supervisor}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Supervisor" />}
									/>               
      
              </Grid>
            {/* data --- 	FieldPartner	 */}
              <Grid item xs={12} md={3}>                
        <Autocomplete
										
										options={allFieldPartner}
										filterSelectedOptions
										getOptionLabel={(option) => option.name}
										isOptionEqualToValue={(option, value) => (option.name === value.name )}
										onChange={(e, v) => {
											setFieldPartner(v);								
										}}
										value={fieldPartner}
               							renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type FP" label="Select Field Partner" />}
              />
              </Grid>
            {/* data --- State	 */}
            <Grid item xs={12} md={3}> 
			  <Autocomplete
										
										options={allStates}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setState(v);
											setAllDistricts([]);
											setDistrict("");
											getDistrict(v);
										}}
										value={state}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select State" />}
									/>               
      
              </Grid>
            {/* data --- district		 */}
              <Grid item xs={12} md={3}>                
        <Autocomplete
										
										options={allDistricts}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setDistrict(v);										
								

										}}
										value={district}
               							renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type district" label="Select district" />}
              />
              </Grid>
       
            
            </>}
            <Grid item xs={12} style={{display:"flex",alignItems:"center"}}>
           <span style={{flexGrow:0.5}}/>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<FcSearch />}
        onClick={() => getTableDataWithFiter()}
      >
        Get Data
      </Button>
      <span style={{flexGrow:0.05}}/>
      {!exportId && ( <Button
        endIcon={<FcRefresh />}
        onClick={() => exportBusinessData()}
      >
        Create Export Link
      </Button> )}
      {exportId && ( <Button
        endIcon={<FcRefresh />}
        target="_blank" href={`https://searchkarna.com/api/v1/addition/business/exportBusiness/downloadBusiness/${exportId}`}
      >
        Export Data
      </Button> )}
            </Grid>
        </Grid>
        </AccordionDetails>
      </Accordion>
        </Card>
          
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.workArea}>
                    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={coData}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
                    
                    </Card></Grid>
                </Grid>
                
    </>
    } />
    
  );
}


    const coData = [
      {field:"Detail",
        renderCell:(params) => {
          return <FullScreenDialog insideData={ 
            <>
            <InsideDialog compo = {params.row} />
          </>
          }/>
        }
    },
      { field: '_id', headerName: 'Unique Reg. ID', width: 210 },
      { field: 'categoryName', headerName: 'Category', width: 130 },
      { field: 'businessName', headerName: 'Buisness/Shop Name', width: 200 },
      { field: 'modesOfPayment', headerName: 'Payment Mode', width: 130 },
      { field: 'state', headerName: 'State', width: 130 },
      { field: 'city', headerName: 'city', width: 130 },
      // {
      //   field: 'age',
      //   headerName: 'Age',
      //   type: 'number',
      //   width: 90,
      // },
      // {
      //   field: 'fullName',
      //   headerName: 'Full name',
      //   description: 'This column has a value getter and is not sortable.',
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.categoryName || ''}`,
      // },
    ];
    const visibilityOption = [
      { label: 'Public', id: "public" },
      { label: 'Unlisted', id: "unlisted" },
      { label: 'Private', id: "private" },
      {label: 'Pending', id: "pending" },
    ]
    
