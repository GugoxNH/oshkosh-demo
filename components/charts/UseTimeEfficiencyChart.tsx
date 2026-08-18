"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

type ChartValues = {
  useTime: number[];
  efficiency: number[];
};

function randomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(): ChartValues {
  return {
    useTime: Array.from({ length: 18 }, () =>
      randomValue(10, 80)
    ),

    efficiency: Array.from({ length: 18 }, () =>
      randomValue(40, 100)
    ),
  };
}

const labels = Array.from({ length: 18 }, (_, index) => {
  const day = String(index + 1).padStart(2, "0");

  return `2026-08-${day}`;
});

export default function UseTimeEfficiencyChart() {
  const [values, setValues] = useState<ChartValues | null>(null);

  useEffect(() => {
    setValues(generateRandomValues());
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
        label: "Use Time",
        data: values.useTime,

        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.05)",

        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#36a2eb",
        pointBorderWidth: 2,

        borderWidth: 2,

        tension: 0.4,

        fill: false,
      },

      {
        label: "Efficiency",
        data: values.efficiency,

        borderColor: "#46c2c7",
        backgroundColor: "rgba(70, 194, 199, 0.12)",

        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#46c2c7",
        pointBorderWidth: 2,

        borderWidth: 2,

        tension: 0.4,

        fill: true,
      },

      {
        label: "Objective",
        data: Array(18).fill(95),

        borderColor: "#f6c04d",
        backgroundColor: "#f6c04d",

        pointBackgroundColor: "#f6c04d",
        pointBorderColor: "#f6c04d",

        pointRadius: 4,
        pointHoverRadius: 5,

        borderWidth: 2,

        tension: 0,

        fill: false,
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
          boxHeight: 12,

          font: {
            size: 12,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,

        ticks: {
          stepSize: 20,

          callback: function (value: string | number) {
            return `${value}%`;
          },
        },

        grid: {
          color: "rgba(0,0,0,0.08)",
        },
      },

      x: {
        ticks: {
          maxRotation: 50,
          minRotation: 50,

          font: {
            size: 10,
          },
        },

        grid: {
          color: "rgba(0,0,0,0.06)",
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5] p-3">

      <div className="text-center mb-1">
        <p className="text-[14px] font-semibold text-gray-600">
          Use Time VS Efficiency
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Line
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}