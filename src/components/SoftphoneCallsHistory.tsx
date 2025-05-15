import { CAccordion } from "@coreui/react";
import { CallSessionItem } from "./CallSessionItem";
import { useSIPProvider } from "../libs";

export const SoftphoneCallsHistory = () => {

    const customTitle: object = {
        textAlign: 'center',
        fontWeight: '500',
        margin: '1rem 0',
        padding: '3rem 0',
        position: 'sticky',
        top: '0.7rem',
        zIndex: '-1'
    }

    const {
        sessions,
    } = useSIPProvider();

  return (
    <div className="h-100">
      <h4 style={customTitle}>Chamadas</h4>
      <div
        className=" h-100 d-flex flex-column align-items-center justify-content-center"
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
