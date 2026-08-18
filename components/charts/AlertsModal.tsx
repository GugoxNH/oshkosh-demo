"use client";

export type AlertItem = {
  id: number;
  date: string;
  type: "Info";
  message: "Cut plan" | "Calibrate" | "Clean nozzle";
};

type AlertsModalProps = {
  title: string;
  alerts: AlertItem[];
  onClose: () => void;
};

export default function AlertsModal({
  title,
  alerts,
  onClose,
}: AlertsModalProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
      "
      onClick={onClose}
    >
      <div
        className="
          w-[780px]
          max-w-[92vw]
          h-[580px]
          max-h-[82vh]
          bg-white/95
          shadow-2xl
          flex
          flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div
          className="
            h-9
            shrink-0
            bg-grisosh
            text-white
            flex
            items-center
            justify-center
            relative
            text-sm
            font-semibold
          "
        >
          <p>{title}</p>

          <button
            onClick={onClose}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-white
              text-xl
              cursor-pointer
              hover:text-red-400
            "
          >
            ×
          </button>
        </div>

        {/* Lista */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-2
          "
        >
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="
                min-h-7
                grid
                grid-cols-[190px_80px_1fr]
                items-center
                text-[13px]
                text-gray-700
                border-b
                border-gray-100
                hover:bg-gray-100
              "
            >
              <span>{alert.date}</span>

              <span>{alert.type}</span>

              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}