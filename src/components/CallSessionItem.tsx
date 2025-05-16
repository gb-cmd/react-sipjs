import { SessionState } from "sip.js";
import { useSessionCall, SessionDirection } from "../libs";
import { CallTimer } from "./CallTimer";
import { PiPhoneIncomingFill, PiPhoneOutgoingFill } from "react-icons/pi";
// import { CallAnswerButtons } from "./CallAnswerButtons";
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";
import "./index.css";
// import { CallAnswerButtons } from "./CallAnswerButtons";

export const CallSessionItem = (props: { sessionId: string }) => {
  const { sessionId } = props;

  const sessionCall = useSessionCall(sessionId);

  if (sessionCall === null) {
    return null;
  }

  const { session, direction, timer } = sessionCall;

  return (
    <CAccordionItem className="w-100">
      <CAccordionHeader className="w-100">
        {direction === SessionDirection.INCOMING ? (
              <div className="d-flex justify-content-center gap-1">
                <PiPhoneIncomingFill 
                  style={{ width: "1rem", height: "1rem", marginRight: '.5rem', backgroundColor: '#229741'}}
                />
                <p>Chamada entrante</p>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-1">
                <PiPhoneOutgoingFill
                  style={{ width: "1.2rem", height: "1.2rem", marginRight: '.5rem', color: '#de5a5a'}}
                />
                <p className="text-center mb-0" >Chamada sainte</p>
              </div>
            )}
      </CAccordionHeader>

      <CAccordionBody className="d-flex justify-content-between p-3">
        <div className="w-50 me-3 d-flex align-items-center">
          <p
            className="text-break fw-medium mb-0 lh-sm"
            style={{ fontSize: "0.86rem" }}
          >
            ID Chamada: {session.id}
          </p>

        </div>

        <div className="w-25">
          <p className="mb-1 fw-light" style={{ fontSize: "0.86rem" }}>
            Duration:
            {timer?.answeredAt && (
              <CallTimer
                isEnd={session.state === SessionState.Terminated}
                startAt={timer.answeredAt}
              />
            )}
          </p>
          <div
            className="d-flex align-items-center justify-content-start"
            style={{ fontSize: "0.86rem" }}
          >
            
          </div>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
};
