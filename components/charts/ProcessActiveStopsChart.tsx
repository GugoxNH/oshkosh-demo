"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type ProcessData = {
  hours: number[];
  percentage: number[];
};

const labels = [
  "Process Active",
  "Op wait for job",
  "Op wait confirm",
  "Change table",
  "Errors",
  "Clean-calibrate",
  "Op wait material",
  "Collisions",
];

function randomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData(): ProcessData {
  return {
    hours: labels.map(() => randomValue(0, 50)),
    percentage: labels.map(() => randomValue(0, 100)),
  };
}

export default function ProcessActiveStopsChart() {
  const [values, setValues] = useState<ProcessData | null>(null);

  useEffect(() => {
    setValues(generateData());
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

  const barColors = [
    "#8BE58A",
    "#FFD000",
    "#FFD79A",
    "#6495ED",
    "#E9163C",
    "#67E8C3",
    "#C4C4C4",
    "#FF5B8A",
  ];

  const data = {
    labels,

    datasets: [
      {
        type: "bar" as const,
        label: "Hours",
        data: values.hours,
        backgroundColor: barColors,
        borderWidth: 0,
        yAxisID: "yHours",
        order: 2,
      },

      {
        type: "line" as const,
        label: "Percentage",
        data: values.percentage,

        borderColor: "#F6BD43",
        backgroundColor: "#F6BD43",

        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#F6BD43",
        pointBorderWidth: 2,

        pointRadius: 4,
        pointHoverRadius: 5,

        borderWidth: 2,

        tension: 0.35,

        fill: false,

        yAxisID: "yPercentage",
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index" as const,
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            if (context.dataset.yAxisID === "yPercentage") {
              return `Percentage: ${context.parsed.y}%`;
            }

            return `Hours: ${context.parsed.y} h`;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,

          font: {
            size: 10,
          },
        },

        grid: {
          color: "rgba(0,0,0,0.06)",
        },
      },

      // Eje izquierdo - Horas
      yHours: {
        type: "linear" as const,
        position: "left" as const,

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

      // Eje derecho - Porcentaje
      yPercentage: {
        type: "linear" as const,
        position: "right" as const,

        min: 0,
        max: 100,

        ticks: {
          stepSize: 10,

          callback: function (value: string | number) {
            return `${value}%`;
          },
        },

        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5] p-3">
      <div className="text-center mb-2">
        <p className="text-[14px] font-semibold text-gray-600">
          Process Active & Accumulate Stops
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Chart
          type="bar"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}