  const VerifyFieldsFun=(allValues)=>{
	  let returnStatement = {
		  message:"No Issue",
		  variant:"success"
	  }
const id = allValues.id;
const link = allValues.link;
const state = allValues.state;
const district = allValues.district;
const tahsilBlock = allValues.tahsilBlock;
const village = allValues.village;
const pincode = allValues.pincode;
const landmark = allValues.landmark;
const registrationNo = allValues.registrationNo;
const receiptNo = allValues.receiptNo;
const contactPersonName = allValues.contactPersonName;
const contactNo = allValues.contactNo;
const businessName = allValues.businessName;
const emailId = allValues.emailId;
const website = allValues.website;
const category = allValues.category;
const subCategory = allValues.subCategory;
const myServices = allValues.myServices;
const yearEstablished = allValues.yearEstablished;
const modesOfPayment = allValues.modesOfPayment;
const latitude = allValues.latitude;
const longitude = allValues.longitude;
const isTandCAccepted = allValues.isTandCAccepted;
const isOtpVerified = allValues.isOtpVerified;
const otp = allValues.otp;


if(state === undefined || state === null || state === ""){
	returnStatement.message = "state is required";
	returnStatement.variant = "error";
} else if(district === undefined || district === null || district === ""){
	returnStatement.message = "district is required";
	returnStatement.variant = "error";
} else if(tahsilBlock === undefined || tahsilBlock === null || tahsilBlock === ""){
	returnStatement.message = "tahsilBlock is required";
	returnStatement.variant = "error";
} else if(village === undefined || village === null || village === ""){
	returnStatement.message = "village is required";
	returnStatement.variant = "error";
} else if(pincode === undefined || pincode === null || pincode === ""){
	returnStatement.message = "pincode is required";
	returnStatement.variant = "error";
} else if(pincode.length !== 6){ 
	returnStatement.message = "pincode should be 6 digits";
	returnStatement.variant = "error";
} else if(landmark === undefined || landmark === null || landmark === ""){
	returnStatement.message = "landmark is required";
	returnStatement.variant = "error";
} else if(registrationNo === undefined || registrationNo === null || registrationNo === ""){
	returnStatement.message = "registrationNo is required";
	returnStatement.variant = "error";
} else if(receiptNo === undefined || receiptNo === null || receiptNo === ""){
	returnStatement.message = "receiptNo is required";
	returnStatement.variant = "error";
} else if(contactPersonName === undefined || contactPersonName === null || contactPersonName === ""){
	returnStatement.message = "contactPersonName is required";
	returnStatement.variant = "error";
} else if(contactNo === undefined || contactNo === null || contactNo === ""){
	returnStatement.message = "contactNo is required";
	returnStatement.variant = "error";
} else if(businessName === undefined || businessName === null || businessName === ""){
	returnStatement.message = "businessName is required";
	returnStatement.variant = "error";
} else if(emailId === undefined || emailId === null || emailId === ""){
	returnStatement.message = "emailId is required";
	returnStatement.variant = "error";
} else if(website === undefined || website === null || website === ""){
	returnStatement.message = "website is required";
	returnStatement.variant = "error";
} else if(category === undefined || category === null || category === ""){
	returnStatement.message = "category is required";
	returnStatement.variant = "error";
} else if(subCategory === undefined || subCategory === null || subCategory === ""){
	returnStatement.message = "subCategory is required";
	returnStatement.variant = "error";
} else if(myServices === undefined || myServices === null || myServices === ""){
	returnStatement.message = "myServices is required";
	returnStatement.variant = "error";
} else if(yearEstablished === undefined || yearEstablished === null || yearEstablished === ""){
	returnStatement.message = "yearEstablished is required";
	returnStatement.variant = "error";
} else if(modesOfPayment === undefined || modesOfPayment === null || modesOfPayment === ""){
	returnStatement.message = "modesOfPayment is required";
	returnStatement.variant = "error";
// } else if(latitude === undefined || latitude === null || latitude === ""){
// 	returnStatement.message = "latitude is required";
// 	returnStatement.variant = "error";
// } else if(longitude === undefined || longitude === null || longitude === ""){
// 	returnStatement.message = "longitude is required";
// 	returnStatement.variant = "error";

} else {
	returnStatement.message = "Success";
	returnStatement.variant = "success";
}







	
	   return returnStatement;
	}

  export default VerifyFieldsFun;