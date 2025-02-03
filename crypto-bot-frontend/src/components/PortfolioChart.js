import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#007BFF", "#FF5733", "#28A745", "#FFC107", "#6C757D"];

const PortfolioChart = ({ portfolio }) => {
    if (!portfolio || Object.keys(portfolio).length === 0) {
        return <p className="text-center text-gray-500">🔍 Aucune donnée de portefeuille disponible.</p>;
    }

  const data = Object.keys(portfolio).map((symbol, index) => ({
    name: symbol,
    value: portfolio[symbol].quantity * portfolio[symbol].current_price,
    color: COLORS[index % COLORS.length], // Attribue une couleur à chaque crypto
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h2 className="text-xl font-bold text-center mb-4">💰 Répartition du Portefeuille</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
