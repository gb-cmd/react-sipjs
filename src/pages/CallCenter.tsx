import { useState } from "react";
import { CONNECT_STATUS, RegisterStatus, useSIPProvider } from "../libs";
import { CallSessionItem } from "../components/CallSessionItem";
import { CButton, CForm, CFormInput, CFormLabel } from "@coreui/react";

export const CallCenter = () => {
  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();
  const [username, setUsername] = useState<string>("2000");
  const [password, setPassword] = useState<string>("dialer123");

  const [callTo, setCallTo] = useState<string>("1000");

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-50 d-flex flex-column gap-3">
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
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center gap-1">
            <div
              className={`rounded-circle text-bg-${
                connectStatus === CONNECT_STATUS.CONNECTED
                  ? "success"
                  : "warning"
              }`}
              style={{width: '0.8rem', height: '0.8rem'}}
            >
              <div
                className={`rounded-circle text-bg-${
                  connectStatus === CONNECT_STATUS.CONNECTED
                    ? "success"
                    : "warning"
                }`}
                style={{width: '0.8rem', height: '0.8rem'}}
              ></div>
            </div>
            <p className="fw-light mb-0" style={{ fontSize: '.9rem'}}>
              Status de conexão: {connectStatus === "DISCONNECTED" ? "Desconectado" : "Conectado"}
            </p>
          </div>
          <div className="d-flex flex-row align-items-center gap-1">
            <div
              className={`rounded-circle text-bg-${
                registerStatus === RegisterStatus.REGISTERED
                  ? "success"
                  : "warning"
              }`}
              style={{width: '0.8rem', height: '0.8rem'}}
            >
              <div
                className={`rounded-circle ${
                  registerStatus === RegisterStatus.REGISTERED
                    ? "success"
                    : "warning"
                }`}
                style={{width: '0.8rem', height: '0.8rem'}}
              ></div>
            </div>
            <p className="fw-light mb-0" style={{ fontSize: '.9rem'}}>
              Registro de status: {registerStatus === "UNREGISTERED" ? "Não registrado" : "Registrado"}
            </p>
          </div>
        </div>

        <CForm
          onSubmit={async (e) => {
            e.preventDefault();
            await sessionManager?.call(`sip:${callTo}@10.101.0.84`, {});
          }}
        >
          <div className="d-flex flex-column gap-2">
            <CFormLabel htmlFor="newCallInput">Fazer nova chamada</CFormLabel>
            <CFormInput
              id="newCallInput"
              value={callTo}
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setCallTo(e.target.value);
              }}
            />

            <CButton
              color="primary"
              type="submit"
              className="fw-semibold"
            >
              Chamar
            </CButton>
          </div>
        </CForm>
        <div className="d-flex align-items-center justify-content-center">
          <ul role="list" className="w-100 ps-0 mb-0">
            {Object.keys(sessions).map((sessionId) => (
              <CallSessionItem key={sessionId} sessionId={sessionId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* 
  return (
    <div className="flex justify-center">
      <div className="min-w-[700px] flex flex-col gap-5">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              connectAndRegister({
                username: username,
                password: password,
              });
            }}
          >
            <div className="flex flex-col gap-5">
              <label>SIP Credential</label>
              <input
                value={username}
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
              <input
                value={password}
                type="password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />

              {connectStatus !== CONNECT_STATUS.CONNECTED ? (
                <button
                  type="submit"
                  className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                >
                  Connect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    sessionManager?.disconnect();
                  }}
                  className="text-[0.8rem] bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded"
                >
                  Disconnect
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <div className="mt-1 flex items-center gap-x-1.5">
            <div
              className={`flex-none rounded-full bg-${
                connectStatus === CONNECT_STATUS.CONNECTED
                  ? "emerald"
                  : "yellow"
              }-500/20 p-1`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  connectStatus === CONNECT_STATUS.CONNECTED
                    ? "bg-emerald-500"
                    : "bg-yellow-500"
                }`}
              ></div>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Connect Status: {connectStatus}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-1.5">
            <div
              className={`flex-none rounded-full bg-${
                registerStatus === RegisterStatus.REGISTERED
                  ? "emerald"
                  : "yellow"
              }-500/20 p-1`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  registerStatus === RegisterStatus.REGISTERED
                    ? "bg-emerald-500"
                    : "bg-yellow-500"
                }`}
              ></div>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Register Status: {registerStatus}
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sessionManager?.call(
              `sip:${callTo}@10.101.0.84`,
              {}
            );
          }}
        >
          <div className="flex flex-col gap-5">
            <label>Make the new call</label>
            <input
              value={callTo}
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setCallTo(e.target.value);
              }}
            />

            <button
              type="submit"
              className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              Call
            </button>
          </div>
        </form>
        <div className="flex flex-1 items-center justify-center">
          <ul role="list" className="divide-y divide-gray-100">
            {Object.keys(sessions).map((sessionId) => (
              <CallSessionItem key={sessionId} sessionId={sessionId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

*/
