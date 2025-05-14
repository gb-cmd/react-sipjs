import { CCard } from "@coreui/react";
import { ToastContainer } from "react-toastify";
import { SoftphoneNavigation } from "../components/SoftphoneNavigation";

export const CallCenter = () => {

  // const [page, setPage] = useState("conexão");

  // const {
  //   sessions,
  // } = useSIPProvider();

  return (
    <SoftphoneNavigation />
    // <div className="w-100 d-flex flex-column justify-content-center">

    //   <CCard className="w-100 d-flex flex-column gap-2 p-4 shadow border border-opacity-25">
    //     <CForm
    //       onSubmit={async (e) => {
    //         e.preventDefault();
    //         connectStatus === "CONNECTED"
    //           ? await sessionManager?.call(`sip:${callTo}@10.101.0.84`, {})
    //           : toast.error("Conecte-se antes de efetuar uma chamada.", {
    //               position: "top-right",
    //               autoClose: 3500,
    //               hideProgressBar: false,
    //               closeOnClick: true,
    //               pauseOnHover: true,
    //               transition: Slide,
    //               draggable: false,
    //             });
    //       }}
    //     >
    //       <div className="d-flex flex-column gap-2">
    //         <CFormLabel className="mb-0" htmlFor="newCallInput">
    //           Fazer nova chamada
    //         </CFormLabel>
    //         <CFormInput
    //           id="newCallInput"
    //           value={callTo}
    //           type="text"
    //           onChange={(e) => {
    //             e.preventDefault();
    //             setCallTo(e.target.value);
    //           }}
    //         />

    //         <CButton color="primary" type="submit" className="fw-semibold">
    //           Chamar
    //         </CButton>
    //       </div>
    //     </CForm> 
    //     <p className="text-start mb-0 fw">Chamadas</p>
    //     <div
    //       className="d-flex flex-column align-items-center justify-content-center"
    //       style={{ height: "190px" }}
    //     >
    //       <CAccordion className="w-100 h-100 ps-0 mb-0 overflow-auto">
    //         {Object.keys(sessions).map((sessionId) => (
    //           <CallSessionItem key={sessionId} sessionId={sessionId} />
    //         ))}
    //       </CAccordion>
    //     </div>
    //   </CCard>
    //   <ToastContainer />
    // </div>
  );
};
