import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Typography } from "@mui/material";
import { getChartData } from "../../helpers";
import styles from "../../styles/global.module.css";

export default function Chart() {
  const { data } = useQuery({
    queryKey: ["chart-page"],
    queryFn: () => getChartData(),
    refetchInterval: 5000,
  });

  return (
    <section>
      <header className={styles.header}> Welcome to charts page </header>
      <div className="chart-container">
        <Typography variant="h4" sx={{ mb: 5, mt: 5, textAlign: "center" }}>
          A diagram for the temperature of Baku and London cities
        </Typography>

        <div className={styles.chartContainer}>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#0049b7"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="month"
              stroke="#82ca9d"
              strokeDasharray="3 4 5 2"
            />
          </LineChart>
        </div>
      </div>
    </section>
  );
}
