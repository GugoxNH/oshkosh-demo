"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";


type AlertItem = {
  id: number;
  date: string;
  type: "Info";
  message: "Cut plan" | "Calibrate" | "Clean nozzle";
};

type DetailRow = {
  label: string;
  seconds: number;
};

type DetailsData = {
  shift: string;
  startedTime: string;
  endedTime: string;
  rows: DetailRow[];
};

const alertMessages: AlertItem["message"][] = [
  "Cut plan",
  "Calibrate",
  "Clean nozzle",
];

function generateRandomHourMinute() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;
}

function generateRandomShift() {
  const startHour = Math.floor(Math.random() * 24);

  // Turno de 8 o 12 horas aleatoriamente
  const duration = Math.random() < 0.5 ? 8 : 12;

  const endHour = (startHour + duration) % 24;

  return `${String(startHour).padStart(2, "0")}:00 - ${String(
    endHour
  ).padStart(2, "0")}:00`;
}

function generateRandomDurationSeconds() {
  // Desde 5 minutos hasta 30 horas
  const minSeconds = 5 * 60;
  const maxSeconds = 30 * 60 * 60;

  return Math.floor(
    Math.random() * (maxSeconds - minSeconds + 1) + minSeconds
  );
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function generateDetails(): DetailsData {
  const labels = [
    "Change table",
    "Clean-calibrate",
    "Errors",
    "Op wait confirm",
    "Op wait for job",
    "Op wait material",
    "Process Active",
  ];

  const rows: DetailRow[] = labels.map((label) => ({
    label,
    seconds: generateRandomDurationSeconds(),
  }));

  return {
    shift: generateRandomShift(),
    startedTime: generateRandomHourMinute(),
    endedTime: generateRandomHourMinute(),
    rows,
  };
}

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;
}

function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function generateAlerts(): AlertItem[] {
  const currentDate = getCurrentDate();

  return Array.from({ length: 20 }, (_, index): AlertItem => ({
    id: index + 1,
    date: `${currentDate} ${generateRandomTime()}`,
    type: "Info",
    message:
      alertMessages[
      Math.floor(Math.random() * alertMessages.length)
      ],
  })).sort((a, b) => b.date.localeCompare(a.date));
}

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip
);

function randomValue(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type DonutProps = {
  value: number;
  color: string;
  label: string;
};

function DonutChart({
  value,
  color,
  label,
}: DonutProps) {

  // Para valores mayores a 100
  // visualmente llenamos la dona completa.
  const chartValue = value;

  const data = {
    datasets: [
      {
        data: [
          chartValue,
          100 - chartValue,
        ],
        backgroundColor: [
          color,
          "#ffffff",
        ],
        borderWidth: 0,
        cutout: "68%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">

      <div className="relative w-16 h-16">

        <Doughnut
          data={data}
          options={options}
        />

        {/* Porcentaje central */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            text-[13px]
            text-gray-600
            font-semibold
          "
        >
          {value}%
        </div>

      </div>

      <p
        className="
          mt-1
          text-[12px]
          text-gray-500
          whitespace-nowrap
        "
      >
        {label}
      </p>

    </div>
  );
}

type ModuleProps = {
  title: string;
  onAlerts: (title: string) => void;
  onDetails: (title: string) => void;
};

function MachineModule({
  title,
  onAlerts,
  onDetails,
}: ModuleProps) {
  const [beamTime, setBeamTime] = useState(0);
  const [speedEfficiency, setSpeedEfficiency] = useState(0);

  useEffect(() => {
    setBeamTime(randomValue(0, 100));
    setSpeedEfficiency(randomValue(0, 100));
  }, []);

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-center
        px-2
      "
    >
      {/* Titulo */}
      <div
        className="
          w-full
          border-b
          border-gray-200
          mb-2
          text-center
        "
      >
        <p
          className="
            italic
            text-gray-600
            text-[15px]
            pb-1
          "
        >
          {title}
        </p>
      </div>

      {/* Graficas */}
      <div
        className="
          w-full
          flex
          justify-evenly
          items-start
        "
      >
        <DonutChart
          value={beamTime}
          color="#333333"
          label="Beam time"
        />

        <DonutChart
          value={speedEfficiency}
          color={
            speedEfficiency >= 90
              ? "#63d46f"
              : speedEfficiency >= 55 && speedEfficiency < 90
              ? "#FFCC00"
              : "#FF6384"
          }
          label="Speed efficiency"
        />
      </div>

      {/* Botones */}
      <div
        className="
          w-full
          flex
          flex-col
          gap-1
          mt-1
        "
      >
        <button
          onClick={() => onAlerts(title)}
          className="
            w-full
            h-7
            bg-white
            border
            border-gray-300
            rounded
            text-[12px]
            text-gray-600
            shadow-sm
            cursor-pointer
            hover:bg-gray-100
          "
        >
          Alerts
        </button>

        <button
          onClick={() => onDetails(title)}
          className="
            w-full
            h-7
            bg-white
            border
            border-gray-300
            rounded
            text-[12px]
            text-gray-600
            shadow-sm
            cursor-pointer
            hover:bg-gray-100
          "
        >
          Details
        </button>
      </div>
    </div>
  );
}

type AlertsModalProps = {
  title: string;
  alerts: AlertItem[];
  onClose: () => void;
};

function AlertsModal({
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
          w-195
          max-w-[90vw]
          h-145
          max-h-[80vh]
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
            p-3
          "
        >
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="
                min-h-7
                grid
                grid-cols-[35px_190px_80px_1fr]
                items-center
                text-[13px]
                text-gray-700
                border-b
                border-gray-100
                hover:bg-gray-100
              "
            >
              <span></span>

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

type DetailsModalProps = {
  title: string;
  details: DetailsData;
  onClose: () => void;
};

function DetailsModal({
  title,
  details,
  onClose,
}: DetailsModalProps) {
  const totalSeconds = details.rows.reduce(
    (total, row) => total + row.seconds,
    0
  );

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
          w-70
          bg-white
          border
          border-gray-500
          shadow-2xl
          px-4
          py-3
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <div className="relative border-b border-gray-200 pb-2 mb-2">
          <p
            className="
              text-center
              italic
              font-semibold
              text-gray-600
              text-[17px]
            "
          >
            {title}
          </p>

          <button
            onClick={onClose}
            className="
              absolute
              right-0
              top-0
              text-gray-500
              cursor-pointer
              hover:text-black
            "
          >
            ×
          </button>
        </div>

        {/* Información del turno */}
        <div
          className="
            text-center
            text-[15px]
            leading-4.5
            text-gray-600
            pb-3
            border-b
            border-gray-200
          "
        >
          <p>
            Shift{" "}
            <span className="font-semibold">
              {details.shift}
            </span>
          </p>

          <p>
            Started time{" "}
            <span className="font-semibold">
              {details.startedTime}
            </span>
          </p>

          <p>
            Ended time{" "}
            <span className="font-semibold">
              {details.endedTime}
            </span>
          </p>
        </div>

        {/* Tabla */}
        <div className="mt-3 text-[14px] text-gray-600">
          {details.rows.map((row) => (
            <div
              key={row.label}
              className="
                grid
                grid-cols-[1fr_85px]
                gap-3
                leading-4.75
              "
            >
              <span className="text-right">
                {row.label}
              </span>

              <span className="text-right font-medium">
                {formatDuration(row.seconds)}
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            className="
              grid
              grid-cols-[1fr_85px]
              gap-3
              mt-1
              font-bold
              text-gray-700
            "
          >
            <span className="text-right">
              Total
            </span>

            <span className="text-right">
              {formatDuration(totalSeconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductionCharts() {
  const [alertsOpen, setAlertsOpen] = useState(false);

  const [alertModule, setAlertModule] = useState("");

  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [detailsModule, setDetailsModule] = useState("");

  const [detailsData, setDetailsData] =
    useState<DetailsData | null>(null);

  function openDetails(moduleName: string) {
    setDetailsModule(moduleName);
    setDetailsData(generateDetails());
    setDetailsOpen(true);
  }

  function closeDetails() {
    setDetailsOpen(false);
  }

  function openAlerts(moduleName: string) {
    setAlertModule(moduleName);
    setAlerts(generateAlerts());
    setAlertsOpen(true);
  }

  function closeAlerts() {
    setAlertsOpen(false);
  }

  return (
    <>
      <div
        className="
          w-full
          h-full
          flex
          flex-col
          justify-evenly
          py-3
        "
      >
        <MachineModule
          title="Fibra 1"
          onAlerts={openAlerts}
          onDetails={openDetails}
        />

        <MachineModule
          title="CO 2"
          onAlerts={openAlerts}
          onDetails={openDetails}
        />

        <MachineModule
          title="Fibra 2"
          onAlerts={openAlerts}
          onDetails={openDetails}
        />
      </div>

      {alertsOpen && (
        <AlertsModal
          title={alertModule}
          alerts={alerts}
          onClose={closeAlerts}
        />
      )}
      {detailsOpen && detailsData && (
        <DetailsModal
          title={detailsModule}
          details={detailsData}
          onClose={closeDetails}
        />
      )}
    </>
  );
}