import { useRef } from "react";

export function Teste() {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSendNotification = () => {
    if (messageRef.current) {
      const message = messageRef.current.value;

      if (Notification.permission === "granted") {
        new Notification("Mensagem", {
          body: message
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Notificação", {
              body: message
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <p>Notificação</p>

      <div style={{ border: "1px solid black", height: "50px", display: "flex" }}>
        <input type="text" ref={messageRef} style={{ flex: "1", fontSize: "16px" }} />
        <button onClick={handleSendNotification}>Enviar notificação</button>
      </div>
    </div>
  );
}
