import { SessionState } from "sip.js";
import { useSessionCall, SessionDirection } from "../libs";
import { CallTimer } from "./CallTimer";
import { PiPhoneIncomingLight, PiPhoneOutgoingLight } from "react-icons/pi";
// import { CallAnswerButtons } from "./CallAnswerButtons";
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";
import "./index.css";
import { CallAnswerButtons } from "./CallAnswerButtons";

export const CallSessionItem = (props: { sessionId: string }) => {
  const { sessionId } = props;

  const sessionCall = useSessionCall(sessionId);

  if (sessionCall === null) {
    return null;
  }

  const { session, direction, timer } = sessionCall;

  console.log(session);

  return (
    <CAccordionItem className="w-100">
      <CAccordionHeader className="w-100">
        <p className="mb-0">Chamada #</p>
      </CAccordionHeader>

      <CAccordionBody>
        <div className="w-75 me-3">
          <p
            className="text-break text-truncate fw-semibold lh-sm"
            style={{ fontSize: "0.9rem" }}
          >
            ID Chamada: {session.id}
          </p>

        </div>

        <div className="w-25 d-flex flex-column align-items-start gap-4">
          <p className="mb-0 fw-light" style={{ fontSize: "0.86rem" }}>
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
            {direction === SessionDirection.INCOMING ? (
              <div className="d-flex justify-content-center gap-1">
                <PiPhoneIncomingLight
                  style={{ width: "1rem", height: "1rem" }}
                />
                <p className="mb-0 fw-light">Chamada de entrada</p>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-1">
                <PiPhoneOutgoingLight
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
                <p className="mb-0 fw-light">Chamada de saída</p>
              </div>
            )}
          </div>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
};
