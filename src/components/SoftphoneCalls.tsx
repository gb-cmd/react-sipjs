import { CButton, CForm, CFormInput, CFormLabel } from "@coreui/react";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import { useSIPProvider } from "../libs";

export const SoftphoneCalls = () => {

  const [callTo, setCallTo] = useState<string>("1001");

  const { connectStatus, sessionManager } = useSIPProvider();

  return (
    <CForm
      onSubmit={async (e) => {
        e.preventDefault();
        connectStatus === "CONNECTED"
          ? await sessionManager?.call(`sip:${callTo}@10.101.0.84`, {})
          : toast.error("Conecte-se antes de efetuar uma chamada.", {
              position: "top-right",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              transition: Slide,
              draggable: false,
            });
      }}
    >
      <div className="d-flex flex-column gap-2">
        <CFormLabel className="mb-0" htmlFor="newCallInput">
          Fazer nova chamada
        </CFormLabel>
        <CFormInput
          id="newCallInput"
          value={callTo}
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setCallTo(e.target.value);
          }}
        />

        <CButton color="primary" type="submit" className="fw-semibold">
          Chamar
        </CButton>
      </div>
    </CForm>
  );
};
