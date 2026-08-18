"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

type StopsData = {
  changeTable: number[];
  errors: number[];
  opWaitConfirm: number[];
  opWaitJob: number[];
  opWaitMaterial: number[];
  cleanCalibrate: number[];
  collisions: number[];
};

function randomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStopsData(): StopsData {
  const totalDays = 18;

  return {
    changeTable: Array.from(
      { length: totalDays },
      () => randomValue(0, 8)
    ),

    errors: Array.from(
      { length: totalDays },
      () => randomValue(0, 6)
    ),

    opWaitConfirm: Array.from(
      { length: totalDays },
      () => randomValue(0, 10)
    ),

    opWaitJob: Array.from(
      { length: totalDays },
      () => randomValue(0, 12)
    ),

    opWaitMaterial: Array.from(
      { length: totalDays },
      () => randomValue(0, 7)
    ),

    cleanCalibrate: Array.from(
      { length: totalDays },
      () => randomValue(0, 5)
    ),

    collisions: Array.from(
      { length: totalDays },
      () => randomValue(0, 4)
    ),
  };
}

const labels = Array.from({ length: 18 }, (_, index) => {
  const day = String(index + 1).padStart(2, "0");

  return `2026-08-${day}`;
});

export default function StopsHistoryChart() {
  const [values, setValues] = useState<StopsData | null>(null);

  useEffect(() => {
    setValues(generateStopsData());
  }, []);

  if (!values) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Cargando gráfica...
        </p>
      </div>
    );
  }

  const data = {
    labels,

    datasets: [
      {
        label: "Change table",
        data: values.changeTable,
        backgroundColor: "#6495ED",
        stack: "stops",
      },
      {
        label: "Errors",
        data: values.errors,
        backgroundColor: "#E9163C",
        stack: "stops",
      },
      {
        label: "Op wait confirm",
        data: values.opWaitConfirm,
        backgroundColor: "#FFD99A",
        stack: "stops",
      },
      {
        label: "Op wait for job",
        data: values.opWaitJob,
        backgroundColor: "#FFCC00",
        stack: "stops",
      },
      {
        label: "Op wait material",
        data: values.opWaitMaterial,
        backgroundColor: "#C4C4C4",
        stack: "stops",
      },
      {
        label: "Clean-calibrate",
        data: values.cleanCalibrate,
        backgroundColor: "#67E8C3",
        stack: "stops",
      },
      {
        label: "Collisions",
        data: values.collisions,
        backgroundColor: "#FF5B8A",
        stack: "stops",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,

        labels: {
          boxWidth: 35,
          boxHeight: 14,

          font: {
            size: 11,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y} h`;
          },
        },
      },
    },

    scales: {
      x: {
        stacked: true,

        ticks: {
          maxRotation: 50,
          minRotation: 50,

          font: {
            size: 10,
          },
        },

        grid: {
          display: false,
        },
      },

      y: {
        stacked: true,

        min: 0,
        max: 50,

        ticks: {
          stepSize: 10,

          callback: function (value: string | number) {
            return `${value}`;
          },
        },

        title: {
          display: true,
          text: "Hours",

          font: {
            size: 12,
          },
        },

        grid: {
          color: "rgba(0,0,0,0.08)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5] p-3">
      <div className="text-center mb-1">
        <p className="text-[14px] font-semibold text-gray-600">
          Stops History
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}