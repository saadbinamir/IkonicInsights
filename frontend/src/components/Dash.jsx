import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { useAuth } from "../utils/Auth";
import Toast from "../common/Toast";
import LoadingBar from "react-top-loading-bar";
export default function Dash() {
  const auth = useAuth();

  const [err, setErr] = useState("");
  const [errState, setErrState] = useState();
  const [progress, setProgress] = useState(0);

  return (
    <>
      <LoadingBar
        color="#C39601"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Sidebar />
      <Toast err={err} errState={errState} />
    </>
  );
}
