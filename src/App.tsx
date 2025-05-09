import { SIPProvider } from "./libs/react-sipjs-forked/sip-provider/";
import { CallCenter } from "./pages/CallCenter";

function App() {
  return (
    <div className="w-100 d-flex justify-content-center flex-column align-items-center p-5">
      <SIPProvider
        options={{
          domain: "voice.chatchilladev.sip.jambonz.cloud",
          webSocketServer: "wss://sip.jambonz.cloud:8443",
        }}
      >
        <div className="w-100">
          <CallCenter />
        </div>
      </SIPProvider>
    </div>
  );
}

export default App;
