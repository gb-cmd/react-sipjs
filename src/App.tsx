import { SIPProvider } from "./libs/react-sipjs-forked/sip-provider/";
import { CallCenter } from "./pages/CallCenter";

function App() {
  return (
    <div className="w-100 h-75 d-flex flex-column justify-content-center align-items-center">
      <SIPProvider
        options={{
          domain: "10.101.0.84",
          webSocketServer: "wss://10.101.0.84:8089/ws",
        }}
      >
        <div className="w-100 h-100">
          <CallCenter />
        </div>
      </SIPProvider>
    </div>
  );
}

export default App;
