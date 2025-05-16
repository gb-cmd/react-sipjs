import { CButton, CForm, CFormInput, CTooltip } from "@coreui/react";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import { useSIPProvider } from "../libs";
import { ImPhone } from "react-icons/im";
import { FaBackspace } from "react-icons/fa";

export const SoftphoneCalls = () => {
  const [callTo, setCallTo] = useState<string>("1001");

  const { connectStatus, sessionManager } = useSIPProvider();

  const numArr: number[] = [];

  for (let i = 0; i <= 9; i++) {
    numArr.push(i);
  }

  const removedItem: number = numArr.shift();
  numArr.push(removedItem);

  // const deleteChar = useCallback(() => {
  //   const fodase = callTo.split("");
  //   fodase.pop();
  //   setCallTo(fodase.join(""));
  // }, []);

  // useEffect(() => {
  //   deleteChar();
  // } ,[deleteChar]);

  const customInput: object = {
    margin: "2.5rem 0",
    padding: "2.5rem 0",
    textAlign: "center",
    height: "1rem",
    fontSize: "2.3rem",
    minWidth: "200px",
  };

  return (
    <CForm
      onSubmit={async (e) => {
        e.preventDefault();
        connectStatus === "CONNECTED"
          ? await sessionManager?.call(`sip:${callTo}@10.101.0.84`, {})
          : toast.error("Conecte-se antes de efetuar uma chamada.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              transition: Slide,
              draggable: false,
            });
      }}
    >
      <div className="d-flex flex-column align-items-center gap-2">
        <CFormInput
          id="newCallInput"
          value={callTo}
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setCallTo(e.target.value);
          }}
          plainText
          size="lg"
          style={customInput}
          autoFocus
          maxLength={14}
        />

        <div className="w-75 d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
          {numArr.map((item) => (
            <CButton
              className="fs-1 rounded-circle d-flex justify-content-center align-items-center"
              // variant="outline"
              style={{ width: "4rem", height: "4rem" }}
              value={item}
              onClick={(e) => {
                callTo.length < 15
                  ? setCallTo(`${callTo}${e.target.value}`)
                  : callTo;
              }}
            >
              {item}
            </CButton>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center flex-row gap-3">
        <div style={{ width: "4rem", height: "4rem" }}></div>

        <CTooltip
          className="d-flex justify-content-center alig-items-center"
          content="Chamar"
          placement="bottom"
        >
          <CButton
            className="mt-2 rounded-circle d-flex justify-content-center align-items-center"
            type="submit"
            color="success"
            style={{ width: "4rem", height: "4rem" }}
          >
            <ImPhone className="align-center" size={"1.3rem"} />
          </CButton>
        </CTooltip>

        <CButton
          className="mt-2 rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "4rem", height: "4rem" }}
          onClick={() => {
            console.log("vai tomar no c#");
          }}
        >
          <FaBackspace size={"1.5rem"} />
        </CButton>
      </div>
    </CForm>
  );
};
