import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import VendorImgPrevDeleteCom from "./../Vendor/VendorImgPrevDelete";
import TermAndConCom from "./../Vendor/TermAndCon";
import PrevPageCom from "./../Vendor/PrevPage";
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

export default function AddVendor() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [link, setLink] = useState("");
	const [state, setState] = useState("");
	const [allStates, setAllStates] = useState([]);
	const [district, setDistrict] = useState("");
	const [allDistricts, setAllDistricts] = useState([]);
	const [cityBlock, setCityBlock] = useState("");
	const [allCityBlocks, setAllCityBlocks] = useState([]);
	const [areaName, setAreaName] = useState("");
	const [allAreaNames, setAllAreaNames] = useState([]);
	
	const [openingTime, setOpeningTime] = useState("09:00");
	const [closingTime, setClosingTime] = useState("20:00");
	const [closedDays, setClosedDays] = useState([]);
	const [allDays, setAllDays] = useState(allDays2);
	
	const [pincode, setPincode] = useState("");
	const [landmark, setLandmark] = useState("");
	const [registrationNo, setRegistrationNo] = useState("");
	const [receiptNo, setReceiptNo] = useState("");
	const [contactPersonName, setContactPersonName] = useState("");
	const [contactNo1, setContactNo1] = useState("");
	const [contactNo2, setContactNo2] = useState("");
	const [contactNo3, setContactNo3] = useState("");
	const [contactNo4, setContactNo4] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [emailId, setEmailId] = useState("");
	const [website, setWebsite] = useState("");

	const [allCategory, setAllCategory] = useState([]);
	const [category, setCategory] = useState({
		categoryName:"",
link:""
	});
	const [allSubCategory, setAllSubCategory] = useState([]);
	const [subCategory, setSubCategory] = useState({
		subCategoryName:"",
link:""
	}); 
	const [allMyServices, setAllMyServices] = useState([]);
	const [myServices, setMyServices] = useState([]);
	
	const [yearEstablished, setYearEstablished] = useState("");
	const [allYearStablished, setAllYearStablished] = useState(allYearStablished2);
	const [modesOfPayment, setModesofPayment] = useState([]);
	const [allModesOfPayment, setAllModesofPayment] = useState(allModesOfPayment2);
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [isTandCAccepted, setIsTandCAccepted] = useState(false);
	const [isOtpVerified, setIsOtpVerified] = useState(false);
	const [withoutOtp, setWithoutOtp] = useState(false);
	const [otp, setOtp] = useState("");
	
	const [allImage,setAllImage] = useState([]);
	const [prevPage, setPrevPage] = useState(false);

	const [status, setStatus] = useState("Click the button");

	const [err,setErr] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getCategory();
		getState();
		
	}, []);

	const checkBeforePreview = () => {
		let checkMsg = handleCheck()
		if(checkMsg.variant === "success"){
			setPrevPage(true)
		}
	  }
	const callOtpFun = (myotp,isVerified) => { 
		setIsOtpVerified(isVerified);
		setOtp(myotp);
	}
	const checkBeforeSubmit = (e) => {
		let checkMsg = handleCheck()
		if(checkMsg.variant === "success"){
			handleSubmit(e);
		}
	  }
	const handleCheck = () => {
		let allValues = {
			id,link,state,district,cityBlock,
			areaName,pincode,landmark,registrationNo,
			receiptNo,contactPersonName,contactNo1,contactNo2,contactNo3,contactNo4,
			businessName,emailId,website,category,
			subCategory,myServices,yearEstablished,
			modesOfPayment,latitude,longitude,
			isTandCAccepted,isOtpVerified,otp,allImage
		}
		let checkMsg = VerifyFieldsFun(allValues)
		if (checkMsg.variant !== "success") { 
			if(checkMsg.variant==="error" || checkMsg.variant==="success"){
				snackRef.current.handleSnack({
					message: checkMsg.message,
					variant: checkMsg.variant,
				})
			 } else {
				snackRef.current.handleSnack({
					message: `"Invalid message Type = " ${checkMsg.variant}`,
					variant: "error",
				}) 
			 }

			
		}
		return checkMsg;
	}
	const handleChange=(value,name,type)=>{
		if(type==="text"){
		   var re = /^[A-Za-z_ ]*$/;
		   if (value === '' || re.test(value)) {
			  switch (name) {
				 case "landmark":
					setLandmark(value)
					break;
				case "contactPersonName":
					setContactPersonName(value)
					break;
				case "businessName":
					setBusinessName(value)
					break;
				case "link":
					setLink(value)
					break;
				 default:
					break;
			  }
		   }
  
		}else if(type==="number"){
		   const re = /^[0-9\b]+$/;
		   if (value === '' || re.test(value)) {
			 switch (name) {
				case "pincode":
					setPincode(value)
				   break;
				case "registrationNo":
					setRegistrationNo(value)
					break;
				case "receiptNo":
					setReceiptNo(value)
					break;	
				case "contactNo1":
					setContactNo1(value)
					break;
				case "contactNo2":
					setContactNo2(value)
					break;
				case "contactNo3":
					setContactNo3(value)
					break;
				case "contactNo4":
					setContactNo4(value)
					break;

				default:
				   break;
			 }
		   }
		} else if (type==="emailId"){
			var re = /^[A-Za-z@. ]*$/;
			if (value === '' || re.test(value)) { 
				setEmailId(value)
			}
		} else if (type==="website"){
			var re = /^[A-Za-z. ]*$/;
			if (value === '' || re.test(value)) { 
				setWebsite(value)
			}
		}
	   
	}
	const handleSubmit = async (e) => {
		console.log("submit");
		e.preventDefault();
		let newCat = { _id: id, 
			category,subCategory,myServices,
			link,state,district,cityBlock,areaName,pincode,landmark,
			receiptNo,contactPersonName,
			contactNo1,contactNo2,contactNo3,contactNo4,businessName,emailId,website,
			openingTime,closingTime,closedDays,			
			yearEstablished,
			latitude,longitude,
			modesOfPayment,allImage,isOtpVerified

		};
		await axios
			.post(`/api/v1/addition/vendor/addVendor/${id}`, newCat)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				if(res.data.variant==="success"){
				handleClear();}
			})
			.catch((err) => console.log(err));
	};
	const clearImage = (imgId) => { 
		console.log("imgId")
		console.log(imgId)
		
var newAllImg = allImage.filter((img) => img.imgId !== imgId)
// console.log(newAllImg)
		setAllImage(newAllImg);
	}
	const imgUpload = async (e, name) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			let link = `/api/v1/other/fileupload/mainfolder/vendorImage`
			
				await axios
					.post(link, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => {
						if (name === "image") {
							let imgUrl = res.data.result.secure_url;
							let imgId = res.data.result.public_id;
							setAllImage([...allImage, { imgUrl, imgId }]);
						}
					
					})
					.catch((err) => console.log(err));
			
		}
	};
	const handleClear = () => {
	setId("");
	setLink("");
	setState("");
	setAllStates([]);
	setDistrict("");
	setAllDistricts([]);
	setCityBlock("");
	setAllCityBlocks([]);
	setAreaName("");
	setAllAreaNames([]);
	setOpeningTime("09:00");
	setClosingTime("20:00");
	setClosedDays([]);
	setAllDays(allDays2);
	setPincode("");
	setLandmark("");
	setRegistrationNo("");
	setReceiptNo("");
	setContactPersonName("");
	setContactNo1("");
	setContactNo2("");
	setContactNo3("");
	setContactNo4("");
	setBusinessName("");
	setEmailId("");
	setWebsite("");
	setAllCategory([]);
	setCategory({
		categoryName:"",
link:""
	});
	setAllSubCategory([]);
	setSubCategory({
		subCategoryName:"",
link:""
	});	
	setAllMyServices([]);
	setMyServices([]);
	setYearEstablished("");
	setAllYearStablished(allYearStablished2);
	setModesofPayment([]);
	setAllModesofPayment(allModesOfPayment2);
	setLatitude("");
	setLongitude("");
	setIsTandCAccepted(false);
	setIsOtpVerified(false);
	setWithoutOtp(false);
	setOtp("");
	setAllImage([]);
	setPrevPage(false);
	
	};

	const getLocation = () => {
		if (!navigator.geolocation) {
		  setStatus('Geolocation is not supported by your browser');
		} else {
		  setStatus('Locating...');
		  navigator.geolocation.getCurrentPosition((position) => {
			setStatus("");
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		  }, () => {
			setStatus('Unable to retrieve your location');
		  });
		}
	  }

	const getCategory = () => {
		axios
			.get(`/api/v1/other/primaryDdd/get/namelink`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	
		};
		const getSubCategory = (v) => {
			if (v) {
				axios
					.get(`/api/v1/other/primaryDdd/get/${v.link}`)
					.then((res) => {setAllSubCategory(res.data)})	
					.catch((err) => console.log(err));
			}
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
		const getCityBlock = (state,district) => {
			let fieldData = {
				state: state,
				district: district
			}
			axios
				.post(`/api/v1/dropDown/location/getLocation/cityBlock`,fieldData)
				.then((res) => setAllCityBlocks(res.data))
				.catch((err) => console.log(err));
		
			};
		const getAreaName = (state,district,cityBlock ) => {
			let fieldData = {
				state: state,
				district: district,
				cityBlock: cityBlock
			}
			axios
				.post(`/api/v1/dropDown/location/getLocation/areaName`,fieldData)
				.then((res) => setAllAreaNames(res.data))
				.catch((err) => console.log(err));
		
			};
	
		const getMyServices = (v) => {
			if (v) {}
			
			axios
			.get(`/api/v1/other/primaryDdd/getServices/${v.link}`)
			.then((res) => setAllMyServices(res.data))
			.catch((err) => console.log(err));

			
		};

	const handleDelete = (id) => {
		axios
			.delete(`/api/v1/addition/myServices/delete/${id}`)
			.then((res) => alert(res.data.message))
			.catch((err) => console.log(err));
		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "text":
				if(pincode.length  !== 6){
				    setErr({errIn:"pincode", msg:"Enter 6 Digit Pin code"})
				}else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<>
		<CommonDash compo = {
			<Fragment>
{!prevPage &&(		<Grid container>
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form onSubmit={(e) => checkBeforeSubmit(e)} style={{ maxWidth: "100vw" }}>
				
						<Grid container spacing={2}>
							
							<Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
						
							
							<span style={{flexGrow:1.1}}/>
								
									<Chip color="primary" label="Add Vendor"  />
									<span style={{flexGrow:1}}/>
									
									<IconButton color="primary" href="/GetVendor"  rel="noopener noreferrer">
									<FindInPageIcon />

  									</IconButton>
								
								<span style={{flexGrow:0.1}}/>
							


							</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.categoryName}
										isOptionEqualToValue={(option, value) => (option.categoryName === value.categoryName )}

										onChange={(e, v) => {
											setCategory(v);
											getSubCategory(v);
											setSubCategory({
												subCategoryName:"",
												link:""
											});
											setMyServices([]);
										}}
										value={category}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Category" />}
									/>
								</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allSubCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.subCategoryName}
										isOptionEqualToValue={(option, value) => (option.categoryName === value.subCategoryName )}
										onChange={(e, v) => {
											setSubCategory(v);
											getMyServices(v);
											setMyServices([]);
										}}
										value={subCategory}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select SubCategory" />}
									/>
								</Grid>
							<Grid item xs={12} md={6}>
					{/* 		<Autocomplete
     						   multiple
     						   id="tags-outlined"
     						   options={allMyServices}
     						   getOptionLabel={(option) => option.serviceName}
     						   filterSelectedOptions
								value={myServices}
     						   renderInput={(params) => (
     						     <TextField
     						       {...params}
     						       label="filterSelectedOptions"
     						       placeholder="Favorites"
     						     />
     						   )}
     						 /> */}
							<Autocomplete
							multiple
						options={allMyServices}
						noOptionsText="First Select Sub Category"
						// filterSelectedOptions
						getOptionLabel={(option) => (option.serviceName)}
						onChange={(e, v) =>setMyServices(v)}
						value={myServices}
						renderInput={(params) => <TextField {...params} label="Select Services" variant="outlined" fullWidth />}
					/>   

								</Grid>
								{/* // drop down ends */}			
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
											setAllCityBlocks([])
											setCityBlock("");
											setAllAreaNames([]);
											setAreaName("");
											getDistrict(v);


										}}
										value={state}
										renderInput={(params) => <TextField {...params} variant="outlined" label="SEARCH State" />}
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
											setAllCityBlocks([])
											setCityBlock("");
											setAllAreaNames([]);
											setAreaName("");
											getCityBlock(state,v);

										}}
										value={district}
               							renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type district" label="SEARCH district" />}
              />
              </Grid>
            {/* data --- cityBlock		 */}
              					<Grid item xs={12} md={6}>                
       									 <Autocomplete
										options={allCityBlocks}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setCityBlock(v);
											setAllAreaNames([]);
											setAreaName("");
											getAreaName(state,district,v);
										
										}}
										value={cityBlock} 
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type cityBlock" label="SEARCH City Block" />}
              />
              </Grid>
            {/* data --- AreaName		 */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allAreaNames}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setAreaName(v);				
										
										}}
										value={areaName}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type AreaName" label="SEARCH Area Name" />}
              />
              </Grid>
              
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "6",
									 inputMode: 'numeric', pattern: '[0-9]*' }}
									onBlur={() => handleErr("pincode")}
									error={err.errIn === "pincode" ? true : false}
									label={err.errIn === "pincode" ? err.msg : "Pincode"}
									placeholder="Enter Pincode"
									value={pincode}
									onChange={(e) =>handleChange(e.target.value,"pincode","number",) }
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("landmark")}
									error={err.errIn === "landmark" ? true : false}
									label={err.errIn === "landmark" ? err.msg : "Landmark"}
									placeholder="Enter Landmark..."
									value={landmark}
									onChange={(e) => handleChange(e.target.value,"landmark","text") }
								/>
							</Grid>
              {registrationNo && (<Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("registrationNo")}
									error={err.errIn === "registrationNo" ? true : false}
									label={err.errIn === "registrationNo" ? err.msg : "Registration No	"}
									placeholder="Enter Registration No..."
									value={registrationNo}
									onChange={(e) =>  handleChange(e.target.value,"registrationNo","number")}
								/>
							</Grid>)}
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("receiptNo")}
									error={err.errIn === "receiptNo" ? true : false}
									label={err.errIn === "receiptNo" ? err.msg : "Receipt no "}
									placeholder="Enter Receipt no..."
									value={receiptNo}
									onChange={(e) => handleChange(e.target.value,"receiptNo","number")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("contactPersonName")}
									error={err.errIn === "contactPersonName" ? true : false}
									label={err.errIn === "contactPersonName" ? err.msg : "Contact Person Name	"}
									placeholder="Enter Contact Person Name..."
									value={contactPersonName}
									onChange={(e) => handleChange(e.target.value,"contactPersonName","text")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("contactNo1")}
									error={err.errIn === "contactNo1" ? true : false}
									label={err.errIn === "contactNo1" ? err.msg : "Primary Contact No"}
									placeholder="Enter Primary Contact No..."
									value={contactNo1}
									InputProps={{
										maxLength: "10",
										readOnly: isOtpVerified,
									  }}
									onChange={(e) => handleChange(e.target.value,"contactNo1","number")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("contactNo2")}
									error={err.errIn === "contactNo2" ? true : false}
									label={err.errIn === "contactNo2" ? err.msg : "Secondary Contact No "}
									placeholder="Enter Secondary Contact No..."
									value={contactNo2}
									InputProps={{
										maxLength: "10",
										readOnly: isOtpVerified,
									  }}
									onChange={(e) => handleChange(e.target.value,"contactNo2","number")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("contactNo3")}
									error={err.errIn === "contactNo3" ? true : false}
									label={err.errIn === "contactNo3" ? err.msg : "Other Contact No 1"}
									placeholder="Enter Other Contact No 1..."
									value={contactNo3}
									InputProps={{
										maxLength: "10",
										readOnly: isOtpVerified,
									  }}
									onChange={(e) => handleChange(e.target.value,"contactNo3","number")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									fullWidth
									inputProps={{ maxLength: "10" }}
									onBlur={() => handleErr("contactNo4")}
									error={err.errIn === "contactNo4" ? true : false}
									label={err.errIn === "contactNo4" ? err.msg : "Other Contact No 2"}
									placeholder="Enter Other Contact No 2..."
									value={contactNo4}
									InputProps={{
										maxLength: "10",
										readOnly: isOtpVerified,
									  }}
									onChange={(e) => handleChange(e.target.value,"contactNo4","number")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("businessName")}
									error={err.errIn === "businessName" ? true : false}
									label={err.errIn === "businessName" ? err.msg : "Shop/Business Name "}
									placeholder="Enter Shop/Business Name..."
									value={businessName}
									onChange={(e) => handleChange(e.target.value,"businessName","text")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("link")}
									error={err.errIn === "link" ? true : false}
									label={err.errIn === "link" ? err.msg : "link "}
									placeholder="Enter Shop/Business Name..."
									value={link}
									onChange={(e) => handleChange(e.target.value,"link","text")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("emailId")}
									error={err.errIn === "emailId" ? true : false}
									label={err.errIn === "emailId" ? err.msg : "Email Id"}
									placeholder="Enter Email Id..."
									value={emailId}
									onChange={(e) => handleChange(e.target.value,"emailId","emailId")}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("website")}
									error={err.errIn === "website" ? true : false}
									label={err.errIn === "website" ? err.msg : "Website "}
									placeholder="Enter Website..."
									value={website}
									onChange={(e) => handleChange(e.target.value,"website","website")}
								/>
							</Grid>
							<Grid item xs={6} md={3}> 
							<TextField type="time"
							fullWidth 
             				value={openingTime}
              					onChange={(e) => setOpeningTime(e.target.value)}
               				 InputLabelProps={{
               				     	shrink: true,
               				 }}
               				 inputProps={{
               				     step: 300, // 5 min
               				 }}
						 
               				 label="Start Time"
            			  />
						  </Grid>
						<Grid item xs={6} md={3}> 
            			 <TextField type="time" 
						 fullWidth
            			 value={closingTime}
            			  onChange={(e) => setClosingTime(e.target.value)}
            			    InputLabelProps={{
            			        shrink: true,
            			    }}
            			    inputProps={{
            			        step: 300, // 5 min
            			    }}
						
            			    label="End Time"
            			  />	    
     			 </Grid>
				  <Grid item xs={12} md={6}> 
			  <Autocomplete
						multiple
						options={allDays}
						filterSelectedOptions
						getOptionLabel={(option) => option}
						onChange={(e, v) =>setClosedDays(v)}
						value={closedDays}
						renderInput={(params) => <TextField {...params} label="Select Holiday Days" variant="outlined" fullWidth />}
					/>   
		     
     
              </Grid>     
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allYearStablished}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setYearEstablished(v);
											// getSubCategory(v);
											// setSubCategory({
											// 	subCategoryName:""
											// });
										}}
										value={yearEstablished}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type Year Established" label="SEARCH Year Established" />}
              />
              </Grid>
              <Grid item xs={12} md={6}>   
			  <p>            
			    <Button variant="outlined" startIcon={<AddLocationAltIcon />}
				onClick={() => getLocation()}
				>
        Get Location
      </Button> 
      {" "+ status}
	  <Link target="_blank" href={"https://maps.google.com/?q="+latitude+","+longitude} >
      {latitude && (" Latitude:" + latitude)}
      {longitude && (" Longitude:" + longitude)} </Link></p>
              </Grid>
              <Grid item xs={12} md={6}> 
			  <Autocomplete
						multiple
						options={allModesOfPayment}
						noOptionsText="First Select Sub Category"
						filterSelectedOptions
						getOptionLabel={(option) => option}
						onChange={(e, v) =>setModesofPayment(v)}
						value={modesOfPayment}
						renderInput={(params) => <TextField {...params} label="Select Payment" variant="outlined" fullWidth />}
					/>   
		     
     
              </Grid>          
         			<Grid item xs={12}>
								<Divider />
							</Grid>							
							{allImage.length !== 0 && (
							allImage.map((image, index) => (
								<Grid item key={index} xs={12} md={6}>
								<VendorImgPrevDeleteCom 
								type ={"Image"} 
								imageLink={image.imgUrl} 
								imageId={image.imgId}
								clearImage ={clearImage} 
								dataId={id}
								/>
								</Grid>
							)	)				
						)} 
							{
								allImage.length <= 4 && (
									<Grid item  xs={12} md={6}>
									<TextField
									// required
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/*" }}
										fullWidth
										value={""}
										onBlur={() => handleErr("image")}
										error={err.errIn === "image" ? true : false}
										label={err.errIn === "image" ? err.msg : "Vendor Image"}
										onChange={(e) => imgUpload(e.target.files[0],"image")}
									/> 
									</Grid>
								)
							}							
							<Grid item xs={12}>
								<center>
									
								<Button variant="outlined" onClick={() => checkBeforePreview()} color="success">
      						 Go To Preview Page
     							 </Button>
						
					<Tooltip title="Clear All">
						<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
							<MdClearAll />
						</Fab>
					</Tooltip>								
											
								</center>
							</Grid>
						</Grid>				
						
						</form>
				</Paper>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>

		</Grid>)}
		{prevPage && 
		(
			<Grid container>
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form   style={{ maxWidth: "100vw" }}>
					< PrevPageCom
				state={state}
				district={district}
				cityBlock={cityBlock}
				areaName={areaName}
				pincode={pincode}
				landmark={landmark}
				receiptNo={receiptNo}
				contactPersonName={contactPersonName}
				contactNo1={contactNo1}
				contactNo2={contactNo2}
				contactNo3={contactNo3}
				contactNo4={contactNo4}
				businessName={businessName}
				link={link}
				emailId={emailId}
				website={website}
				yearEstablished={yearEstablished}
				latitude={latitude}
				longitude={longitude}	
				allImage={allImage}		

				category={category}		
				subCategory={subCategory}		
				myServices={myServices}		
				modesOfPayment={modesOfPayment}	
				
				openingTime={openingTime}
				closingTime={closingTime}
				closedDays={closedDays}
			
			/>
					<Grid item xs={12}>
								<center>
									
								{!(isTandCAccepted) && (
									<div className={classes.button} >
								<TermAndConCom 
							setIsTandCAccepted={setIsTandCAccepted}
							handleCheck={handleCheck}
							/>
							</div>
							)}
								{(isTandCAccepted && !isOtpVerified && !withoutOtp) && (
									<div className={classes.button} >
								<OtpDialogCom 
							callOtpFun={callOtpFun}
							contactNo1={contactNo1}
							handleCheck={handleCheck}
							/>
							    <Button variant="outlined" onClick={setWithoutOtp(true)} color="success">
   									Procced WithOut Otp
   								 </Button>
							</div>
							)}
								 {(isTandCAccepted && (isOtpVerified || withoutOtp)) && (<Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" onClick={(e) => checkBeforeSubmit(e)} className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip> )}
									<Button variant="outlined" onClick={() => setPrevPage(false)} color="secondary">
      						 Go Back To Edit
     							 </Button>							
															
								</center>
							</Grid>			   
						
						</form>
				</Paper>
			</Grid>
			
			<Grid item xs={0} md={1}> </Grid>
	
		</Grid>
		
		)}

		<MySnackbar ref={snackRef} />
	</Fragment>

		} />
		

		</>
		
	
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
// 5.1 Sunday.
// 5.2 Monday.
// 5.3 Tuesday.
// 5.4 Wednesday.
// 5.5 Thursday.
// 5.6 Friday.
// 5.7 Saturday.

const allDays2 = [
	"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

const testData = [
  { label: 'The Shawshank Redemption', id: 1994 },
  { label: 'The Godfather', id: 1972 },
  { label: 'The Godfather: Part II', id: 1974 },
 
];