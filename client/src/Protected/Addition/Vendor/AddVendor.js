import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import VendorImgPrevDeleteCom from "./../Vendor/VendorImgPrevDelete";
import TermAndConCom from "./../Vendor/TermAndCon";

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
	const [districtName, setDistrict] = useState("");
	const [allDistricts, setAllDistricts] = useState([]);
	const [tahsilBlock, setTahsilBlock] = useState("");
	const [allTahsilBlocks, setAllTahsilBlocks] = useState([]);
	const [village, setVillage] = useState("");
	const [allVillages, setAllVillages] = useState([]);

	
	const [pincode, setPincode] = useState("");
	const [landmark, setLandmark] = useState("");
	const [registrationNo, setRegistrationNo] = useState("");
	const [receiptNo, setReceiptNo] = useState("");
	const [contactPersonName, setContactPersonName] = useState("");
	const [contactNo, setContactNo] = useState("");
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
	const [myServices, setMyServices] = useState({
		serviceName:"",
link:""
	});
	
	const [yearEstablished, setYearEstablished] = useState("");
	const [allYearStablished, setAllYearStablished] = useState(allYearStablished2);
	const [modesOfPayment, setModesofPayment] = useState("");
	const [allModesOfPayment, setAllModesofPayment] = useState(allModesOfPayment2);
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	
	const [allImage,setAllImage] = useState([]);

	const [status, setStatus] = useState("Click the button");

	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getCategory();
		getState();
	}, []);
	const handleChange=(value,name,type)=>{
		if(type==="text"){
		   var re = /^[A-Za-z_ ]*$/;
		   if (value === '' || re.test(value)) {
			  switch (name) {
				 case "landmark":
					setLandmark(value)
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
				
				default:
				   break;
			 }
		   }
		}
	   
	}
	const handleSubmit = async (e) => {
		console.log("submit");
		e.preventDefault();
		let newCat = { _id: id, 
			link,state,districtName,tahsilBlock,village,pincode,landmark,
			registrationNo,receiptNo,contactPersonName,
			contactNo,businessName,emailId,website,
			category,subCategory,myServices,
			yearEstablished,
			latitude,longitude,
			modesOfPayment,

		};
		await axios
			.post(`/api/v1/addition/vendor/${id}`, newCat)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				// handleClear();
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
		setDistrict("");
		setTahsilBlock("");
		setVillage("");
		setPincode("");
		setLandmark("");
		setRegistrationNo("");
		setReceiptNo("");
		setContactPersonName("");
		setContactNo("");
		setBusinessName("");
		setEmailId("");
		setWebsite("");
		setCategory({
			categoryName:"",
link:""
		});
		setSubCategory({
			subCategoryName:"",
link:""
		});
		setMyServices({
			serviceName:"",
link:""
		});
		setYearEstablished("");
		setModesofPayment("");
		setLatitude("");
		setLongitude("");
		
		
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
				.post(`/api/v1/dropDown/location/getLocation/districtName`,fieldData)
				.then((res) => setAllDistricts(res.data))
				.catch((err) => console.log(err));
		
			};
		const getTahsilBlock = (state,districtName) => {
			let fieldData = {
				state: state,
				districtName: districtName
			}
			axios
				.post(`/api/v1/dropDown/location/getLocation/tahsilBlock`,fieldData)
				.then((res) => setAllTahsilBlocks(res.data))
				.catch((err) => console.log(err));
		
			};
		const getVillage = (state,districtName,tahsilBlock ) => {
			let fieldData = {
				state: state,
				districtName: districtName,
				tahsilBlock: tahsilBlock
			}
			axios
				.post(`/api/v1/dropDown/location/getLocation/village`,fieldData)
				.then((res) => setAllVillages(res.data))
				.catch((err) => console.log(err));
		
			};


		const getMyServices = (v) => {
			if (v) {
				axios
					.get(`/api/v1/other/primaryDdd/getServices/${v.link}`)
					.then((res) => {setAllMyServices(res.data);console.log(res.data);console.log({v})})	
					.catch((err) => console.log(err));
			}
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
			case "title":
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
			<Grid item xs={0} md={1}> </Grid>
	
			<Grid item xs={12} md={10}>
				<Paper className={classes.entryArea}>
					<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
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
											setAllTahsilBlocks([])
											setTahsilBlock("");
											setAllVillages([]);
											setVillage("");
											getDistrict(v);


										}}
										value={state}
										renderInput={(params) => <TextField {...params} variant="outlined" label="SEARCH State" />}
									/>               
      
              </Grid>
            {/* data --- districtName		 */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allDistricts}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setDistrict(v);										
											setAllTahsilBlocks([])
											setTahsilBlock("");
											setAllVillages([]);
											setVillage("");
											getTahsilBlock(state,v);

										}}
										value={districtName}
               							renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type districtName" label="SEARCH districtName" />}
              />
              </Grid>
            {/* data --- tahsilBlock		 */}
              					<Grid item xs={12} md={6}>                
       									 <Autocomplete
										options={allTahsilBlocks}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setTahsilBlock(v);
											setAllVillages([]);
											setVillage("");
											getVillage(state,districtName,v);
										
										}}
										value={tahsilBlock} 
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type tahsilBlock" label="SEARCH tahsilBlock" />}
              />
              </Grid>
            {/* data --- Village		 */}
              <Grid item xs={12} md={6}>                
        <Autocomplete
										
										options={allVillages}
										filterSelectedOptions
										getOptionLabel={(option) => option}
										isOptionEqualToValue={(option, value) => (option === value )}
										onChange={(e, v) => {
											setVillage(v);				
										
										}}
										value={village}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Type Village" label="SEARCH Village" />}
              />
              </Grid>
              
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42",
									 inputMode: 'numeric', pattern: '[0-9]*' }}
									onBlur={() => handleErr("pincode")}
									error={err.errIn === "pincode" ? true : false}
									label={err.errIn === "pincode" ? err.msg : "Pincode"}
									placeholder="Enter Pincode"
									value={pincode}
									onChange={(e) =>handleChange(e.target.value,"pincode","number") }
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
              <Grid item xs={12} md={6}>  
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
									onChange={(e) => setRegistrationNo(e.target.value)}
								/>
							</Grid>
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
									onChange={(e) => setReceiptNo(e.target.value)}
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
									onChange={(e) => setContactPersonName(e.target.value)}
								/>
							</Grid>
              <Grid item xs={12} md={6}>  
								<TextField
									variant="outlined"
									required
									fullWidth
									inputProps={{ maxLength: "42" }}
									onBlur={() => handleErr("contactNo")}
									error={err.errIn === "contactNo" ? true : false}
									label={err.errIn === "contactNo" ? err.msg : "Contact No "}
									placeholder="Enter Contact No..."
									value={contactNo}
									onChange={(e) => setContactNo(e.target.value)}
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
									onChange={(e) => setBusinessName(e.target.value)}
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
									onChange={(e) => setLink(e.target.value)}
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
									onChange={(e) => setEmailId(e.target.value)}
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
									onChange={(e) => setWebsite(e.target.value)}
								/>
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
											setMyServices({
												serviceName:"",
												link:""
											});
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
											setMyServices({
												serviceName:"",
link:""
											});
										}}
										value={subCategory}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select SubCategory" />}
									/>
								</Grid>
							<Grid item xs={12} md={6}>
									<Autocomplete
										
										options={allMyServices}
										filterSelectedOptions
										getOptionLabel={(option) => option.serviceName}
										onChange={(e, v) => {
											setMyServices(v);
											
										}}
										value={myServices}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Services" />}
									/>
								</Grid>
								{/* // drop down ends */}
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
										
		 options={allModesOfPayment}
		 filterSelectedOptions
		 getOptionLabel={(option) => option}
		isOptionEqualToValue={(option, value) => (option === value )}
		 onChange={(e, v) => {
		 	setModesofPayment(v);
		
		 }}
										value={modesOfPayment}
               renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Select Mode of Payment" label="SEARCH Mode of Payment" />}
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
							<TermAndConCom />
							</Grid>
							
							<Grid item xs={12}>
								<center>
								 <Tooltip title={id === "" ? "Save" : "Update"}>
										<Fab color="primary" type="submit" className={classes.button}>
											<MdDoneAll />
										</Fab>
									</Tooltip> 
									 {/* <Tooltip title={id === "" ? "Save" : "Update"}>
                  <AlertDialog />						
									</Tooltip>  */}
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

		</Grid>
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

const testData = [
  { label: 'The Shawshank Redemption', id: 1994 },
  { label: 'The Godfather', id: 1972 },
  { label: 'The Godfather: Part II', id: 1974 },
 
];