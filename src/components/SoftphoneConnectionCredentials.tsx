import { useState } from "react";
import { CONNECT_STATUS, RegisterStatus, useSIPProvider } from "../libs";
import { CButton, CForm, CFormInput, CFormLabel } from "@coreui/react";

export const SoftphoneConnectionCredentials = () => {
  const [username, setUsername] = useState<string>("1010");
  const [password, setPassword] = useState<string>("dialer123");

    const { 
        connectAndRegister, 
        connectStatus, 
        sessionManager, 
        registerStatus 
    } = useSIPProvider();

  return (
    <div>
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
              connectStatus === CONNECT_STATUS.CONNECTED ? "success" : "warning"
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
    </div>
  );
};
