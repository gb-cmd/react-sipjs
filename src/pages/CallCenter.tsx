import { useState } from "react";
import { CONNECT_STATUS, RegisterStatus, useSIPProvider } from "../libs";
import { CallSessionItem } from "../components/CallSessionItem";
import { CButton, CForm, CFormInput, CFormLabel } from "@coreui/react";
import { Slide, toast, ToastContainer } from "react-toastify";

export const CallCenter = () => {
  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();
  const [username, setUsername] = useState<string>("1010");
  const [password, setPassword] = useState<string>("dialer123");

  const [callTo, setCallTo] = useState<string>("1001");

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-50 d-flex flex-column gap-2">
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            connectAndRegister({
              username: username,
              password: password,
            });
          }}
        >
          <div className="d-flex flex-column gap-2">
            <CFormLabel className="mb-0" htmlFor="sipCredentialInput">
              Credencial &#40;SIP&#41;
            </CFormLabel>
            <CFormInput
              id="sipCredentialInput"
              value={username}
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
            />
            <CFormInput
              value={password}
              type="password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />

            {connectStatus !== CONNECT_STATUS.CONNECTED ? (
              <CButton type="submit" className="fw-semibold" color="success">
                Conectar
              </CButton>
            ) : (
              <CButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  sessionManager?.disconnect();
                }}
                className="fw-semibold"
                color="danger"
              >
                Desconectar
              </CButton>
            )}
          </div>
        </CForm>

        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center gap-1">
            <span
              className={`rounded-circle text-bg-${
                connectStatus === CONNECT_STATUS.CONNECTED
                  ? "success"
                  : "warning"
              }`}
              style={{
                width: "0.8rem",
                height: "0.8rem",
              }}
            ></span>
            <p className="fw-light mb-0" style={{ fontSize: ".9rem" }}>
              Status de conexão:{" "}
              {connectStatus === "CONNECTED" ? "Conectado" : "Desconectado"}
            </p>
          </div>
          <div className="d-flex flex-row align-items-center gap-1">
            <span
              className={`rounded-circle text-bg-${
                registerStatus === RegisterStatus.REGISTERED
                  ? "success"
                  : "warning"
              }`}
              style={{ width: "0.8rem", height: "0.8rem" }}
            ></span>
            <p className="fw-light mb-0" style={{ fontSize: ".9rem" }}>
              Registro de status:{" "}
              {registerStatus === "UNREGISTERED"
                ? "Não registrado"
                : "Registrado"}
            </p>
          </div>
        </div>

        <CForm
          onSubmit={async (e) => {
            e.preventDefault();

            // if(connectStatus === "CONNECTED") {
            //   await sessionManager?.call(`sip:${callTo}@10.101.0.84`, {});
            // }
            // // alert("Conecte antes de chamar!")
            // toast.error("Conecte-se antes de efetuar uma chamada.", {
            //   position: "top-right",
            //   autoClose: 3500,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   transition: Zoom,
            //   draggable: false
            // })

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
        <p className="text-start mb-0 fw">Chamadas</p>
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "260px" }}
        >
          <ul role="list" className="w-100 h-100 ps-0 mb-0 overflow-auto">
            {Object.keys(sessions).map((sessionId) => (
              <CallSessionItem key={sessionId} sessionId={sessionId} />
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
