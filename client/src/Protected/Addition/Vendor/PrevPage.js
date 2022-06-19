import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "../../useStyles";
import MySnackbar from "../../../Components/MySnackbar";
import VendorImgPrevDeleteCom from "./../Vendor/VendorImgPrevDelete";
import TermAndConCom from "./../Vendor/TermAndCon";
import TimingCom from "./../Vendor/Timing";
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
  Typography,
} from "@mui/material";
import axios from "axios";
import { MdDoneAll, MdClearAll } from "react-icons/md";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommonDash from "./../../MyDashboard/CommonDash"
import AlertDialog from "./alertDialog";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const theme = createTheme();
// state={state}
// 			district={district}
// 			cityBlock={cityBlock}
// 			areaName={areaName}
// 			pincode={pincode}
// 			landmark={landmark}
// 			receiptNo={receiptNo}
// 			contactPersonName={contactPersonName}
// 			contactNo1={contactNo1}
// 			contactNo2={contactNo2}
// 			contactNo3={contactNo3}
// 			contactNo4={contactNo4}
// 			businessName={businessName}
// 			emailId={emailId}
// 			website={website}
// 			yearEstablished={yearEstablished}
// 			latitude={latitude}
// 			longitude={longitude}		
export default function PrevPageCom({
	state,
	district,
	cityBlock,
	areaName,
	pincode,
	landmark,
	receiptNo,
	contactPersonName,
	contactNo1,
	contactNo2,
	contactNo3,
	contactNo4,
	businessName,
	link,
	emailId,
	website,
	yearEstablished,
	latitude,
	longitude,
	allImage,

	category,
	subCategory,
	myServices,
	modesOfPayment,
}) {
	const classes = useStyles();

	let allData = [
		{ myKey: "State", myValue: state },
		{ myKey: "District", myValue: district },
		{ myKey: "City Block", myValue: cityBlock },
		{ myKey: "Area Name", myValue: areaName },
		{ myKey: "Pincode", myValue: pincode },
		{ myKey: "Landmark", myValue: landmark },
		{ myKey: "Receipt No", myValue: receiptNo },
		{ myKey: "Contact Person Name", myValue: contactPersonName },
		{ myKey: "Primary Contact No.", myValue: contactNo1 },
		{ myKey: "Secondary Contact No", myValue: contactNo2 },
		{ myKey: "Other Contact No 1", myValue: contactNo3 },
		{ myKey: "Other Contact No 2", myValue: contactNo4 },
		{ myKey: "Shop/Business Name", myValue: businessName },
		{ myKey: "Link", myValue: link },
		{ myKey: "Email Id", myValue: emailId },
		{ myKey: "Website", myValue: website },
		{ myKey: "Year Established", myValue: yearEstablished },
		{ myKey: "Latitude", myValue: latitude },
		{ myKey: "Longitude", myValue: longitude },
		

	];


	return (
		<Grid container spacing={2}>
                        
		<Grid item xs={12} style={{display:"flex",alignItems:"center",}}>
	
		
		<span style={{flexGrow:1.1}}/>
			
				<Chip color="primary" label="Verify Vendor"  />
				<span style={{flexGrow:1}}/>
				
				<IconButton color="primary" href="/GetVendor"  rel="noopener noreferrer">
				<FindInPageIcon />

				  </IconButton>
			
			<span style={{flexGrow:0.1}}/>                      
		</Grid>
		<Grid item xs={12} md={6} style={{  display: "flex" }}>
	  <Typography variant="subtitle1" gutterBottom component="div">
	   Category
		</Typography>
		<Typography variant="subtitle1" gutterBottom component="div">
	  {": "+category.categoryName}
		</Typography>
	  </Grid>                
	  <Grid item xs={12} md={6} style={{  display: "flex" }}>
	  <Typography variant="subtitle1" gutterBottom component="div">
	  Sub Category
		</Typography>
		<Typography variant="subtitle1" gutterBottom component="div">
	  {": "+subCategory.subCategoryName}
		</Typography>
	  </Grid>                
	  <Grid item xs={12} md={6} style={{  display: "flex" }}>
	  <Typography variant="subtitle1" gutterBottom component="div">
	  Services
		</Typography>
		<Typography variant="subtitle1" gutterBottom component="div">
	  {": "}
		</Typography>
	{myServices.map((l,i)=> (
		<Typography key={i} variant="subtitle1" gutterBottom component="div">
	  {", "+l.serviceName}
		</Typography>
	))
	
	}
	  </Grid> 
{allData.map((l, i) => (
	  <Grid key={i} item xs={12} md={6} style={{  display: "flex" }}>
	  <Typography variant="subtitle1" gutterBottom component="div">
		  {l.myKey}
		</Typography>
		<Typography variant="subtitle1" gutterBottom component="div">
	  {": "+l.myValue}
		</Typography>
	</Grid>                
))}
               
	  <Grid item xs={12} md={6} style={{  display: "flex" }}>
	  <Typography variant="subtitle1" gutterBottom component="div">
	  Modes Of Payment
		</Typography>
		<Typography variant="subtitle1" gutterBottom component="div">
	  {": "}
		</Typography>
	{modesOfPayment.map((l,i)=> (
		<Typography key={i} variant="subtitle1" gutterBottom component="div">
	  {", "+l}
		</Typography>
	))
	
	}
	  </Grid>                

{allImage.length !== 0 && (
							allImage.map((image, index) => (
								<Grid item key={index} xs={12} md={6}>
								<VendorImgPrevDeleteCom 
								type ={"Image"} 
								imageLink={image.imgUrl} 
								imageId={image.imgId}
								clearImage ={"clearImage"} 
								dataId={"ty"}
								/>
								</Grid>
							)	)				
						)}                    
	</Grid>	
		
  
		
	
	);
}
