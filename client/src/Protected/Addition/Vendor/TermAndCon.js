import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TermAndConCom({cState,setIsTandCAccepted,handleCheck}) {
  const [open, setOpen] = useState(cState);
  const checkBeforeOpen = () => {
    let checkMsg = handleCheck()
    if(checkMsg.variant === "success"){
      handleClickOpen();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={checkBeforeOpen} color="success">
        Accept T & C 
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" >
              Term and Condition
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="outlined" color="error">
            Disagree
          </Button>
          <Button variant="contained" color="success" onClick={() => {
            setIsTandCAccepted(true);
            console.log("hello1")}}>
          Agree
      </Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}

let content = `Use of the Platform or Services

Please read the following terms and conditions carefully before registering on, accessing, browsing, downloading or using the "QUALIFIER" website located at http://quallifier.co.in/, and all associated sites linked to www.qualifier.co.in, or any similar platform (hereinafter collectively, the Qualifier's Platform, having its registered office at Tollygunge, Qualifier Building, KOLKATA – 700040 on any device and/or before availing any services offered by QUALIFIER on the QUALIFIER Platform which may include services such as donation or contribution or any other service that may be offered by QUALIFIER on the QUALIFIER Platform (hereinafter individually, and collectively, the QUALIFIER Services). For the avoidance of doubt, it is clarified that these terms and conditions shall apply to all Our Services, whether offered by QUALIFIER.

Acceptance

By registering on, accessing, browsing, downloading or using the "QUALIFIER" Platform for any general-purpose or for the specific purpose of availing any QUALIFIER Service, You agree to be bound by the single-sign-on ID (hereinafter SSOID) terms and conditions set forth below as well as by the service-specific terms and conditions applicable to each Qualifier Service (hereinafter collectively, the T&Cs). These T&Cs shall also include any additional or modified terms and conditions in relation to the SSOID or any additional or modified service-specific T&Cs in relation to any Qualifier Service or any future service that may be offered by QUALIFIER on the QUALIFIER Platform. By registering on, accessing, browsing, downloading, or using (as applicable) the QUALIFIER Platform or availing any QUALIFIER Service or the SSOID, You automatically and immediately agree to all the T&Cs. If at any time You do not accept or agree with any of the T&Cs or do not wish to be bound by the T&Cs, You may not access, browse or use the QUALIFIER Platform and immediately terminate Your availing the QUALIFIER Services. Accepting or agreeing to the T&Cs will constitute a legal contract (hereinafter Agreement) between You, being at least 18 years of age and an individual user of the QUALIFIER Platform or a customer, donor or beneficiary of the QUALIFIER Services. All services are rendered by QUALIFIER through the QUALIFIER Platform under the brand name QUALIFIER (or any derivatives or variations thereof). Consequently, all the rights, benefits, liabilities and obligations under the T&Cs shall, as the case may be, accrue to the benefit of, or incurred by, QUALIFIER, regarding Your use of QUALIFIER’s digital services (which includes donation and contribution), or any such other services which may be added on the QUALIFIER Platform and which will henceforth be a QUALIFIER Service, from time to time. The QUALIFIER HRIDHI Services shall be used by You subject to Your adherence with the T&Cs. As long as You accept and comply with these T&Cs, QUALIFIER HRIDHI grants You a personal, nonexclusive, non-transferable, limited, revocable privilege to enter and use the QUALIFIER Platform and/or avail the QUALIFIER Services. The terms "We" / "Us" / "Our"/”Company” individually and collectively refer to Qualifier.co.in and the terms "Visitor” ”User” refer to the users.
This page states the Terms and Conditions under which you (Visitor) may visit this website (“Website”). Please read this page carefully. If you do not accept the Terms and Conditions stated here, we would request you to exit this site. The business, any of its business divisions and / or its subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in India or abroad) reserve their respective rights to revise these Terms and Conditions at any time by updating this posting. You should visit this page periodically to re-appraise yourself of the Terms and Conditions, because they are binding on all users of this Website.

Indemnification

You agree to indemnify, save, and hold QUALIFIER, its affiliates, employees, officers, directors and partners harmless from any and all claims, losses, damages, and liabilities, costs and expenses, including without limitation legal fees and expenses, arising out of or related to: (i) Your use or misuse of the QUALIFIER Services or of the QUALIFIER Platform; (ii) any violation by You of this Agreement or the SSOID Agreement; or (iii) any breach of the representations, warranties, and covenants made by You herein. QUALIFIER reserves the right, at Your expense, to assume the exclusive defense and control of any matter for which You are required to indemnify QUALIFIER, including rights to settle, and You agree to cooperate with we defense and settlement of these claims. We will use reasonable efforts to notify You of any claim, action, or proceeding brought by a third party that is subject to the foregoing indemnification upon becoming aware of it. This paragraph shall survive termination of this Agreement.

Disclaimer; No Warranties

To the fullest extent permissible pursuant to applicable law, QUALIFIER and its third-party partners disclaim all warranties or guarantees – whether statutory, express or implied – including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement of proprietary rights. No advice or information, whether oral or written, obtained by You from QUALIFIER or through the QUALIFIER Services or the QUALIFIER Platform will create any warranty or guarantee other than those expressly stated herein. For the purposes of this Disclaimer, You expressly acknowledge that as used in this section, the term “QUALIFIER” includes QUALIFIER'S officers, directors, employees. You acknowledge that QUALIFIER (www.qualifier.co.in) is a purely social and profit enterprise, registered under The MSME Development Act, 2006 and is not liable for any third party (telecom companies, mobile operators or suppliers) obligations due to rates, quality and all other instances, whether to any such telecom companies’ subscribers or otherwise. You expressly agree that the use of the QUALIFIER Services on our Platform is at Your sole risk. It is Your responsibility to evaluate the accuracy, completeness and usefulness of all opinions, advice, services, merchandise and other information provided through the site or on the Internet generally. We do not warrant that our Services will be uninterrupted or error-free or that defects in the site will be corrected. The QUALIFIER Services and our Platform and any data, information, third party software, reference sites, services, or software made available in conjunction with or through the services and the site are provided on an “as is” and “as available,” “with all faults” basis and without warranties or representations of any kind either express or implied. QUALIFIER, and its partners do not warrant that the data, our software, functions, or any other information offered on or through our Services/ our Platform or any reference sites/ platforms/ services will be uninterrupted, or free of errors, viruses or other harmful components and do not warrant that any of the foregoing will be corrected. QUALIFIER and its licensors, and partners do not warrant or make any representations regarding the use or the results of the use of Our Services/ Our Platform or any reference sites/ platforms/ services in terms of correctness, accuracy, reliability, or otherwise. You understand and agree that You use, access, download, or otherwise obtain information, materials, or data through Our Services/ Our Platform or any reference sites/ platforms/ services at Your own discretion and risk and that You will be solely responsible for any damage to Your property (including Your computer system and mobile device or any other equipment) or loss of data that results from the download or use of such material or data. We do not authorize anyone to make any warranty on our behalf and You should not rely on any such statement. This paragraph shall survive the termination of this Agreement. In no event will QUALIFIER be liable for any incidental, consequential, or indirect damages (including, but not limited to, damages for loss of profits, business interruption, loss of programs or information and the like) arising out of the use of or inability to use Our Platform.

Ownership; Proprietary Rights

The QUALIFIER Services and Our Platform are owned and operated by QUALIFIER for Social Welfare. The visual interfaces, graphics, design, compilation, information, computer code (including source code and object code), services, and all other elements of Our Services and Our Platform provided by QUALIFIER for Social Welfare are protected by international conventions, and all other relevant intellectual property and proprietary rights, and applicable laws. As between You and QUALIFIER, all services and programs contained on Our are the property of QUALIFIER for Social Welfare. You agree not to remove, obscure, or alter Anudip or any third party’s copyright, patent, trademark, or other proprietary rights notices affixed to or contained within or accessed in conjunction with or through Our Services/ Platform. Except as expressly authorized by QUALIFIER, You agree not to sell, license, distribute, copy, modify, publicly perform or display, transmit, publish, edit, adapt, create derivative works from, or otherwise make unauthorized use of the services. QUALIFIER reserves all rights not expressly granted in this Agreement. If You have comments regarding Our Services and/or Our Platform or ideas on how to improve it, please contact customer service. Please note that by doing so, You hereby irrevocably assign to QUALIFIER, and shall assign to QUALIFIER, all rights, title and interests in and to all ideas and suggestions and any and all worldwide intellectual property rights associated therewith. You agree to perform such acts and execute such documents as may be reasonably necessary to perfect the foregoing rights.

Dispute Resolution

If any dispute, controversy or claim arises under this Agreement or in relation to any QUALIFIER Service or our Platform, including any question regarding the existence, validity or termination of this Agreement or T&Cs (hereinafter Dispute), the parties shall use all reasonable endeavors to resolve such Dispute amicably. If the parties are unable to resolve the Dispute amicably within 30 days of the notice of such Dispute, QUALIFIER may elect to resolve any Dispute by binding arbitration in accordance with the provisions of the Indian Arbitration & Conciliation Act, 1996 (hereinafter Act). Such Dispute shall be arbitrated on an individual basis and shall not be consolidated in any arbitration with any claim or controversy of any other party. The Dispute shall be resolved by a sole arbitrator, appointed in accordance with the Act. The seat of the arbitration shall be New Delhi and the language of this arbitration shall be English. Either You or Anudip may seek any interim or preliminary relief from a court of competent jurisdiction in Kolkata necessary to protect the rights or the property belonging to You or QUALIFIER (or any of our agents, suppliers, and subcontractors), pending the completion of arbitration. Any arbitration shall be confidential, and neither You nor QUALIFIER may disclose the existence, content or results of any arbitration, except as may be required by law or for purposes of enforcing the arbitration award. All administrative fees and expenses of arbitration will be divided equally between You and QUALIFIER. In all arbitrations, each party will bear the expense of its own lawyers and preparation. This paragraph shall survive termination of this Agreement.

Governing Law and Forum for Disputes

Subject to the Dispute Resolution section above, You agree that any claim or dispute You may have against QUALIFIER must be resolved by a court having jurisdiction in Kolkata, India. You agree to submit to the personal jurisdiction of the courts located within Kolkata, India, for the purpose of litigating all such claims or disputes. This Agreement shall be governed by Indian law. This paragraph shall survive termination of this Agreement.

Refund and Cancellation Policy

Our focus is complete customer satisfaction.Please use our FREE plan before you make payment for any paid plan. The FREE plan is pretty much enough to understand our design or quality of content.In the event, if you are displeased with the services provided, we will not refund back the money, provided the reasons are genuine and proved after investigation like, Fail of Transaction/Money debited but not reflected as service of that account. Plase Note, in case of payment has deducted and service is not started for that account within 24 hours, the user has to send us information via Email/Post regarding the valid transactional details, and same bank account details And after verification of the case, user can get the refund of money or the service with-in 7 working days (max) of the information. Please read the fine prints of each deal before buying it, it provides all the details about the services or the product you purchase. In case of dissatisfaction from our services, clients do not have the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows: Please use our FREE Trail before you pay for any plan. Refund Policy We will try our best to create the suitable design concepts for our clients. In case any client is not completely satisfied with our products we can NOT provide any refund.

Key Persons :-  Mr. Vivek Singh (Grievance Officer)
http://quallifier.co.in/
Registered under, The MSME Act,2006 (A unit of Softechinfra)
Email: softechinfra@gmail.com Ph: +91-9460117600`
