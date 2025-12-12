import React from "react";

const SummaryCards = () => {
  const cards = [
    {
      title: "Total units sold",
      value: "10,000",
      change: "15%",
      isPositive: true,
    },
    { title: "Total Amount", value: "₹889,000", change: "", isPositive: true },
    { title: "Discount", value: "₹1,000", change: "45.50%", isPositive: false },
    { title: "Net Amount", value: "₹888,000", change: "", isPositive: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-text-secondary text-sm font-medium uppercase mb-2">
            {card.title}
          </h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-text-primary">
              {card.value}
            </span>
            {card.change && (
              <span
                className={`text-sm font-medium ${
                  card.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.isPositive ? "+" : "-"}
                {card.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
