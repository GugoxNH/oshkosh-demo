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

const errors = [
  "Error: Fiber laser",
  "Error: Glass cover monitoring not triggered",
  "No compressed air",
  "EtherCAT error: MotionController",
  "EtherCAT error: BaseController module",
  "EtherCAT error: FlowController module",
  "Drive 2 frequency converter tracking resistance not reached",
  "Drive 1 frequency converter tracking resistance not reached",
  "Error: Fiber laser cooling unit no longer in work area",
  "Safety error: loading position drive 1 has actuated",
  "Collision link: torch collision sensor actuated",
  "Drive 1 frequency converter tracking resistance not reached",
  "Safety relay output channel monitoring error",
  "Plausible encoder value for drive 2 out of range",
  "Plausible encoder value for drive 1 out of range",
];

function randomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ErrorsQuantityChart() {
  const [values, setValues] = useState<number[] | null>(null);

  useEffect(() => {
    setValues(
      errors.map(() => randomValue(10, 200))
    );
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
    labels: errors,
    datasets: [
      {
        label: "Quantity",
        data: values,

        backgroundColor: "rgba(255, 99, 132, 0.12)",
        borderColor: "#ff6384",

        borderWidth: 2,

        barPercentage: 0.75,
        categoryPercentage: 0.85,
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
        callbacks: {
          label: function (context: any) {
            return `Quantity: ${context.parsed.y}`;
          },
        },
      },
    },

    scales: {
      y: {
        min: 0,
        max: 200,

        ticks: {
          stepSize: 20,
        },

        title: {
          display: true,
          text: "Quantity",

          font: {
            size: 12,
          },
        },

        grid: {
          color: "rgba(0,0,0,0.08)",
        },
      },

      x: {
        ticks: {
          minRotation: 90,
          maxRotation: 90,

          autoSkip: false,

          font: {
            size: 9,
          },
        },

        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-3">
      <div className="text-center mb-1">
        <p className="text-[14px] font-semibold text-gray-600">
          Quantity Stops
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