"use client";
import initWasm, { draw } from "@/kakkoapp";
import dynamic from "next/dynamic";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export default function Image(props) {
  const [svg, setSvg] = useState<string>("");
  useEffect(() => {
    async function startup() {
      await initWasm();
      setSvg(draw(props.text));
    }
    startup();
  }, [props.text]);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
