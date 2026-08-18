"use client";

import { useEffect, useState } from "react";

type TimeRow = {
  label: string;
  seconds: number;
};

type TimesData = {
  shift: string;
  startedTime: string;
  endedTime: string;
  rows: TimeRow[];
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatClockTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function generateRandomHourMinute() {
  return formatClockTime(
    randomInt(0, 23),
    randomInt(0, 59)
  );
}

function generateRandomShift() {
  const startHour = randomInt(0, 23);

  // duración aleatoria entre 8 y 12 horas
  const duration = Math.random() < 0.5 ? 8 : 12;

  const endHour = (startHour + duration) % 24;

  return `${formatClockTime(startHour, 0)} - ${formatClockTime(endHour, 0)}`;
}

function generateRandomDurationSeconds() {
  const hours = randomInt(0, 99);
  const minutes = randomInt(0, 59);
  const seconds = randomInt(0, 59);

  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function generateTimesData(): TimesData {
  const labels = [
    "Change table",
    "Clean-calibrate",
    "Collisions",
    "Errors",
    "Op wait confirm",
    "Op wait for job",
    "Op wait material",
    "Process Active",
  ];

  const rows: TimeRow[] = labels.map((label) => ({
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

type Props = {
  machine?: string;
};

export default function TimesSummary({
  machine = "Fibra 1",
}: Props) {
  const [data, setData] = useState<TimesData | null>(null);

  useEffect(() => {
    setData(generateTimesData());
  }, []);

  if (!data) {
    return null;
  }

  const totalSeconds = data.rows.reduce(
    (total, row) => total + row.seconds,
    0
  );

  return (
    <div
      className="
        w-full
        h-full
        flex
        items-center
        justify-center
    
      "
    >
      <div
        className="
          w-[240px]
          border
          border-black
          rounded-md
          bg-white
          px-4
          py-3
          text-grisosh
        "
      >
        {/* Título */}
        <div
          className="
            text-center
            border-b
            border-gray-200
           
            
          "
        >
          <p className="font-semibold text-[12px]">
            {machine}
          </p>
        </div>

        {/* Datos principales */}
        <div
          className="
            text-center
            text-[10px]
            leading-[16px]
            border-b
            border-gray-200
            pb-2
            
          "
        >
          <p>
            Shift{" "}
            <span className="font-medium">
              {data.shift}
            </span>
          </p>

          <p>
            Started time{" "}
            <span className="font-medium">
              {data.startedTime}
            </span>
          </p>

          <p>
            Ended time{" "}
            <span className="font-medium">
              {data.endedTime}
            </span>
          </p>
        </div>

        {/* Tabla */}
        <div className="text-[11px] leading-[15px]">
          {data.rows.map((row) => (
            <div
              key={row.label}
              className="
                grid
                grid-cols-[1fr_75px]
                gap-2
              "
            >
              <span className="text-right">
                {row.label}
              </span>

              <span className="text-right">
                {formatDuration(row.seconds)}
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            className="
              grid
              grid-cols-[1fr_75px]
              gap-2
              font-bold
              mt-1
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