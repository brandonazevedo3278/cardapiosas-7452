import { useEffect, useRef, useState } from "react";
import { Box, LoaderCircle } from "lucide-react";

export default function ProductModelViewer({ src, poster, name }: { src: string; poster: string; name: string }) {
  const ref = useRef<HTMLElement & { loaded?: boolean }>(null);
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    void import("@google/model-viewer").then(() => {
      if (active) setRegistered(true);
    }).catch(() => {
      if (active) setStatus("error");
    });
    return () => { active = false; };
  }, [attempt]);

  useEffect(() => {
    if (!registered || !ref.current) return;
    const element = ref.current;
    const loaded = () => { setStatus("loaded"); clearTimeout(timeout); };
    const failed = () => { setStatus("error"); clearTimeout(timeout); };
    const timeout = window.setTimeout(failed, 30000);
    element.addEventListener("load", loaded);
    element.addEventListener("error", failed);
    if (element.loaded) loaded();
    return () => {
      clearTimeout(timeout);
      element.removeEventListener("load", loaded);
      element.removeEventListener("error", failed);
    };
  }, [registered, src, attempt]);

  return (
    <div className="model-frame" data-model-status={status}>
      {registered && (
        <model-viewer
          key={`${src}-${attempt}`}
          ref={ref}
          src={src}
          poster={poster}
          camera-controls
          touch-action="pan-y"
          ar
          ar-modes="webxr scene-viewer quick-look"
          shadow-intensity="1"
          loading="eager"
          reveal="auto"
          alt={`Modelo 3D de ${name}`}
          style={{ width: "100%", height: "330px" }}
        />
      )}
      {status !== "loaded" && (
        <div className="model-status" role={status === "error" ? "alert" : "status"}>
          {status === "loading" ? <LoaderCircle className="spin" size={25} /> : <Box size={28} />}
          <strong>{status === "loading" ? "Carregando modelo 3D…" : "Não foi possível abrir o modelo 3D."}</strong>
          {status === "error" && <>
            <p>O arquivo pode estar indisponível ou ser incompatível. Você ainda pode ver as fotos e fazer seu pedido.</p>
            <button className="btn outline small" onClick={() => {
              setStatus("loading");
              setRegistered(false);
              setAttempt((value) => value + 1);
            }}>Tentar novamente</button>
          </>}
        </div>
      )}
    </div>
  );
}