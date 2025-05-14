import { CTab, CTabList, CTabPanel, CTabs } from "@coreui/react";
import { SoftphoneCalls } from "./SoftphoneCalls";
import { SoftphoneConnectionCredentials } from "./SoftphoneConnectionCredentials";
import { SoftphoneCallsHistory } from "./SoftphoneCallsHistory";

export const SoftphoneNavigation = () => {
  const customStyle: object = {
    "--bs-nav-link-color": "#444444",
    "--bs-nav-link-hover-color": "#111111",
    padding: '.5rem 1.5rem',
    display: 'flex',
    justifyContent: 'center'
  };

  const navList: string[] = ["Chamadas", "Conexão", "Recentes"];

  return (
    <CTabs defaultActiveItemKey="Conexão">
      <CTabList variant="underline" style={customStyle}>
        {navList.map((item) => (
          <CTab className="p-1" aria-controls={`painel-${item}`} itemKey={item}>
            {item}
          </CTab>
        ))}
      </CTabList>

      <CTabPanel aria-labelledby="painel-Chamadas" itemKey="Chamadas">
        <SoftphoneCalls />
      </CTabPanel>

      <CTabPanel aria-labelledby="painel-Conexão" itemKey="Conexão">
        <SoftphoneConnectionCredentials />
      </CTabPanel>

      <CTabPanel aria-labelledby="painel-Recentes" itemKey="Recentes">
        <SoftphoneCallsHistory />
      </CTabPanel>
      
    </CTabs>
  );
};
