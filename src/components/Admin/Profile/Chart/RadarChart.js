import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Like } from "api";
import { useAuth } from "hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const likeController = new Like();

export function RadarChart(props) {
  const { user } = props;
  const { accessToken } = useAuth();

  const muscleGroupGeneral = [
    "Espalda",
    "Brazo",
    "Deltoide",
    "Pectoral",
    "Pierna",
  ];
  const muscleGroupLeg = [
    "Pantorrilla",
    "Gemelos",
    "Cuadriceps",
    "Isquiotibiales",
    "Gluteos",
    "Abductores",
    "Pantorrilla",
    "Aductores",
  ];
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = [];
      let totalLegs = 0;

      for (const group of muscleGroupGeneral) {
        try {
          if (group !== "Pierna") {
            const response = await likeController.getLikedExercises(
              accessToken,
              user._id,
              undefined,
              undefined,
              group
            );
            updatedData.push(response.docs.length);
          }
        } catch (error) {
          console.error(error);
        }
      }

      for (const group of muscleGroupLeg) {
        try {
          const response = await likeController.getLikedExercises(
            accessToken,
            user._id,
            undefined,
            undefined,
            group
          );
          totalLegs += response.docs.length;
        } catch (error) {
          console.error(error);
        }
      }

      setUserData([...updatedData, totalLegs]);
    };

    fetchData();
  }, [accessToken, user._id]);

  const data = {
    labels: muscleGroupGeneral,
    datasets: [
      {
        label: "User Info",
        data: userData,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderColor: "rgb(255, 255, 255)",
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          color: "#bebebe",
        },
        grid: {
          color: "#bebebe",
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={data} options={options} />;
}
