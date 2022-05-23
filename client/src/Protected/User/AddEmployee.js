import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./../useStyles";
import MySnackbar from "../../Components/MySnackbar";
import IconButton from '@mui/material/IconButton';
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Divider,
	InputAdornment,
	Autocomplete,
	InputLabel,
	OutlinedInput,
	FormControl

} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from "axios";
import { MdSearch,MdRemoveRedEye,MdVisibilityOff, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../MyDashboard/CommonDash"
import  {Search, StyledInputBase,SearchIconWrapper} from "./../../Components/Common/SearchBar";
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();

export default function AddEmployee() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
	const [state, setState] = useState("");
	const [allStates, setAllStates] = useState([]);
	const [district, setDistrict] = useState("");
	const [allDistricts, setAllDistricts] = useState([]);
	const [allSupervisor,setAllSupervisor]=useState([]);
	const [supervisor,setSupervisor]=useState(
		{name:"",_id:""}
	  );
	const [designation, setDesignation]= useState({
		label: '', id: ""
	});
    const [allUser, setAllUser] = useState([]); 
	const [values, setValues] = React.useState({
		amount: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	  });	
	  	
	  const handleClickShowPassword = () => {
		setValues({
		  ...values,
		  showPassword: !values.showPassword,
		});
	  };	
	  const handleMouseDownPassword = (event) => {
		event.preventDefault();
	  };    
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err,setErr] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleOpen = () => {
	  setOpen(true);
	};
	useEffect(() => {
		getData("");
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
	const getData = async (word) => {
	console.log("word",word)
		await axios
			.get(`/api/v1/auth/getDeleteUser/allUsers/${word}`)
			.then((res) => (setAllUser(res.data))
			
			)
			.catch((err) => console.log(err));
	};
	const handleCheckBeforeSubmit = () => {
		if (name === "") {
			setErr({ errIn: "name", msg: "Name is required" });
			snackRef.current.handleSnack(
				{"message":"Name is required",
				"variant":"error"}
			);
			return false;
		} else if (mobileNo === "") {
			setErr({ errIn: "mobileNo", msg: "Mobile No is required" });
			snackRef.current.handleSnack(
				{"message":"Mobile No is required",
				"variant":"error"}
			);
			return false;
		} else if (emailId === "") {
			setErr({ errIn: "emailId", msg: "Email Id is required" });
			snackRef.current.handleSnack(
				{"message":"Email Id is required",
				"variant":"error"}
			);
			return false;
		} else if (password === "") {
			setErr({ errIn: "password", msg: "Password is required" });
			snackRef.current.handleSnack(
				{"message":"Password is required",
				"variant":"error"}
			);
			return false;
		} else if (state === "") {
			setErr({ errIn: "state", msg: "State is required" });
			snackRef.current.handleSnack(
				{"message":"State is required",
				"variant":"error"}
			);
			return false;
		} else if (district === "") {
			setErr({ errIn: "district", msg: "District is required" });
			snackRef.current.handleSnack(
				{"message":"District is required",
				"variant":"error"}
			);
			return false;
		} else if (designation.id === "") {
			setErr({ errIn: "designation", msg: "Designation is required" });
			snackRef.current.handleSnack(
				{"message":"Designation is required",
				"variant":"error"}
			);
			return false;
		} else if (designation.id === "fieldPartner" && supervisor._id === "") {
			setErr({ errIn: "supervisor", msg: "Supervisor is required" });
			snackRef.current.handleSnack(
				{"message":"Supervisor is required",
				"variant":"error"}
			);
			return false;
		} else {
			return true;
		}
	
	}
	const handleSubmit = async (e) => {
		e.preventDefault();		
	if(handleCheckBeforeSubmit()){
		handleOpen();
			let newUser = { _id: id, name, mobileNo, emailId, password, state,district,designation,  supervisor};
		await axios
			.post(`/api/v1/auth/register/register/user/${id}`, newUser)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClose()
				if(res.data.variant==="success"){
					handleClear();

				}
			})
			.catch((err) => console.log(err));}
	};
	const handleClear = () => {
		setId("");
		setName("");
		setMobileNo("");
		setEmailId("");
		setPassword("");
		setState("");
		setDistrict("");
		setDesignation({
			label: '', id: ""
		});
		setSupervisor({name:"",_id:""})

	};

	const setData = async (id) => {
		handleOpen();
		await axios
			.get(`/api/v1/auth/getDeleteUser/get/${id}`)
			.then((res) => {
				setId(res.data._id);
				setName(res.data.name);
				setMobileNo(res.data.mobileNo);
				setEmailId(res.data.emailId);
				setPassword(res.data.value);
				setState(res.data.state);
				setDistrict(res.data.district);
				setDesignation(res.data.designation);
				setSupervisor(res.data.supervisor);

		
				
			})
			.catch((err) => console.log(err));
			handleClose();
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/auth/getDeleteUser/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "employeeName":
				// if(title.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
		<Grid container>
			<Grid item xs={12} md={8}>
	
				<Paper className={classes.entryArea}>
					
				<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
						<Grid container spacing={2}>
							
							<Grid item xs={4}></Grid>
							<Grid item xs={4}>
								<center>
									<Chip color="primary" label="Add Employee" />
								</center>
							</Grid>
							<Grid item xs={4}></Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("name")}
									error={err.errIn === "Name" ? true : false}
									label={err.errIn === "name" ? err.msg : "Full Name"}
									placeholder="Full Name.."
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',maxLength: "10" }}
									onBlur={() => handleErr("mobileNo")}
									error={err.errIn === "mobileNo" ? true : false}
									label={err.errIn === "mobileNo" ? err.msg : "Mobile Number"}
									placeholder="Enter 10 Digit Number.."
									value={mobileNo}
									onChange={(e) => setMobileNo(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("emailId")}
									error={err.errIn === "emailId" ? true : false}
									label={err.errIn === "emailId" ? err.msg : "Email Id"}
									placeholder="Enter 10 Digit Number.."
									value={emailId}
									onChange={(e) => setEmailId(e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								
							<FormControl fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
		  
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
							</Grid>						
						       {/* data --- State	 */}
							   <Grid item xs={12} md={6}> 
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
              <Grid item xs={12} md={6}>                
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
						<Grid item xs={12} md={6}> 
						<Autocomplete
										
										options={allDesignation}
										filterSelectedOptions
										getOptionLabel={(option) => option.label}
										onChange={(e, v) => {
											setDesignation(v);
											setSupervisor(
												{name:"",_id:""}
											  );
											getSupervisors();
										}}
										value={designation}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Designation" />}
									/>			
					</Grid>
					
       
 { designation ? 
	designation.id === "fieldPartner" ?
 <>  
  {/* data --- supervisor	 */}
  <Grid item xs={12} md={6}> 
			  <Autocomplete
									
				options={allSupervisor}
				filterSelectedOptions
				getOptionLabel={(option) => option.name}
				isOptionEqualToValue={(option, value) => (option.name === value.name )}
				onChange={(e, v) => {
				setSupervisor(v);
		
				}}
				value={supervisor}
				renderInput={(params) => <TextField {...params} variant="outlined" label="Select Supervisor" />}
				/>               
      
              </Grid>
			 </>
			: <></> :<></>
			
			}
						
							<Grid item xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<center>
									<Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip>
									<Tooltip title="Clear All">
										<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
											<MdClearAll />
										</Fab>
									</Tooltip>
									{id !== "" && (
											<Tooltip title="Delete Forever">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} className={classes.button}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
						
								</center>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
			<Grid item xs={12} md={4}>
				{/* Search Section */}
				<div className={classes.search}>
				<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder= {`Search Employee...`}
			  onChange={(e) => getData(e.target.value)}
			   
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
				{/* <SearchBar name={ "Employee"}  onChange={(e) => getData(e.target.value)} /> */}
				
				</div>
				<div className={classes.searchResult}>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell component="th" scope="row">
										Search Results
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell key={data._id} component="td" scope="row">
											Name : {data.name} ; mobileNo : {data.mobileNo} ;emailId:{data.emailId};Designation:{data.designation.label}  <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allUser.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={(e, page) => setPage(page)}
										onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</Paper>
				</div>
			</Grid>
		</Grid>
		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		</>
		
	
	);
}

const allDesignation = [
    { label: 'Admin', id: "admin" },
    { label: 'Supervisor', id: "supervisor" },
    { label: 'Field Partner', id: "fieldPartner" }, ]
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }, ]

