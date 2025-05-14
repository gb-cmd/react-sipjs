import { CAccordion } from "@coreui/react";
import { CallSessionItem } from "./CallSessionItem";
import { useSIPProvider } from "../libs";

export const SoftphoneCallsHistory = () => {

    const {
        sessions,
      } = useSIPProvider();

  return (
    <div>
      <p className="text-start mb-0 fw">Chamadas</p>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "190px" }}
      >
        <CAccordion className="w-100 h-100 ps-0 mb-0 overflow-auto">
          {Object.keys(sessions).map((sessionId) => (
            <CallSessionItem key={sessionId} sessionId={sessionId} />
          ))}
        </CAccordion>
      </div>
    </div>
  );
};
