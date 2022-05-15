import  React ,{useRef,useEffect, useState,lazy,Suspense} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CommonDash from './../../Protected/MyDashboard/CommonDash';
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
    const [showAdv,setAdv]=useState(false);
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
    
    useEffect(() => {
      getTableData();
    }, []);

    const getTableData = async (word) => {
      let dataToSend = {
        startDate:startDate,
        endDate:endDate,
        word:word
      }
      await axios
        .post(`/api/v1/addition/vendor/tableData`,dataToSend)
        .then((res) => (setTableData(res.data)))
        .catch((err) => console.log(err));
    };

console.log(formatDate)
    const classes = useStyles();
  return (
    <CommonDash compo = 
    {
        <>
             <Grid container spacing={2}>  

                <Grid item xs={12}>
            
                <Card className={classes.workArea}>
                  <div style={{display:"flex",justifyContent:"center"}}> 
                <Chip style={{marginBottom:"4px"}} color="primary" label="Get Vendor"  />    
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
              
            <TextField type="date" fullWidth  value={startDate} required="false" onChange={e=>(setStartDate(e.target.value),setEndDate(e.target.value))} inputProps={{ max:formatDate,min:"2022-01-11"}} InputLabelProps={{ shrink: true }}  label="Start Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={endDate} required="false" onChange={e=>(setEndDate(e.target.value))} inputProps={{ max:formatDate,min:startDate}} InputLabelProps={{ shrink: true }}  label="End Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
             renderInput={(params) => <TextField {...params} label="Status" />}
              />
        
             </Grid>
        
            {showAdv && <>
        
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="Supervisor" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="Employee" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="State" />}
/>
           </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  renderInput={(params) => <TextField {...params} label="City" />}
/>
           </Grid>
       
            
            </>}
            <Grid item xs={12} style={{display:"flex",alignItems:"center"}}>
           <span style={{flexGrow:0.5}}/>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<FcSearch />}
        // onClick={handleSearch}
      >
        Get Data
      </Button>
      <span style={{flexGrow:0.05}}/>
      {/* <Button
        endIcon={<FcRefresh />}
        // onClick={handleClear}
      >
        Reset
      </Button> */}
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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }, ]

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

    
    const tableData = [
      { _id: 1, categoryName: 'Snow',businessName: 'Snow',modesOfPayment: 'Snow',state: 'Snow',city: 'Snow', firstName: 'Jon', age: 35 },
      { _id: 2, categoryName: 'Lannister', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Cersei', age: 42 },
      { _id: 3, categoryName: 'Lannister', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Jaime', age: 45 },
      { _id: 4, categoryName: 'Stark', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Arya', age: 16 },
      { _id: 5, categoryName: 'Targaryen', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Daenerys', age: null },
      { _id: 6, categoryName: 'Melisandre', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: null, age: 150 },
      { _id: 7, categoryName: 'Clifford', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Ferrara', age: 44 },
      { _id: 8, categoryName: 'Frances', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Rossini', age: 36 },
      { _id: 9, categoryName: 'Roxie', businessName: 'Lannister', modesOfPayment: 'Lannister', state: 'Lannister', city: 'Lannister', firstName: 'Harvey', age: 65 },
    ];
