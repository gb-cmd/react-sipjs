import { CButton, CTooltip } from "@coreui/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { RiPauseFill, RiPlayFill } from "react-icons/ri";
import { useSessionCall } from "../libs";

export const CallAnswerButtons = (props: { sessionId: string }) => {
  const { sessionId } = props;

  const sessionCall = useSessionCall(sessionId);

  if (sessionCall === null) {
    return null;
  }

  const {
    session,
    answer,
    decline,
    isHeld,
    isMuted,
    unhold,
    unmute,
    hold,
    mute,
    hangup,
  } = sessionCall;

  return (
    <div className="d-flex flex-row align-items-center justify-content-start flex-wrap gap-2">
      <p
        className="mb-0 align-middle text-dark-emphasis"
        style={{ fontSize: "0.86rem" }}
      >
        {session.state}
      </p>

      {/* {session.state === SessionState.Initial && null} */}
      {/* /\ */}
      <>
        <CTooltip content="Atender" placement="bottom">
          <CButton
            className="rounded-circle d-flex align-items-center"
            variant="outline"
            onClick={answer}
            color="success"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <ImPhone />
          </CButton>
        </CTooltip>

        <CTooltip content="Rejeitar" placement="bottom">
          <CButton
            className="rounded-circle d-flex align-items-center"
            variant="outline"
            onClick={decline}
            color="danger"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <ImPhoneHangUp />
          </CButton>
        </CTooltip>  
      </>

      {/* {SessionState.Established === session.state && (null)} */}

      <>
        <CTooltip content={isHeld ? "Liberar" : "Segurar"} placement="bottom">
          <CButton
            className={
              isHeld === true
                ? "btn-dark active rounded-circle"
                : "btn-dark rounded-circle"
            }
            variant="outline"
            onClick={isHeld ? unhold : hold}
            size="sm"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            {isHeld ? <RiPlayFill /> : <RiPauseFill />}
          </CButton>
        </CTooltip>
        
        <CTooltip content={isMuted ? "Ativar microfone" : "Desativar microfone"} placement="bottom">
          <CButton
            variant="outline"
            onClick={isMuted ? unmute : mute}
            size="sm"
            className={
              isMuted === true
                ? "btn-dark active rounded-pill text-center align-middle"
                : "btn-dark rounded-pill text-center"
            }
            style={{
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            {isMuted ? (
              <FaMicrophoneSlash style={{ width: "1.1rem" }} />
            ) : (
              <FaMicrophone />
            )}
          </CButton>
        </CTooltip>

      </>

      {/* {![SessionState.Terminating, SessionState.Terminated].includes(
        session.state
      ) && null} */}
      <CTooltip content="Encerrar" placement="bottom">
        <CButton
          className="rounded-circle d-flex align-items-center"
          variant="outline"
          onClick={hangup}
          color="danger"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <ImPhoneHangUp />
        </CButton>
      </CTooltip>
    </div>
  );
};
