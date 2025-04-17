import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Users, CircleCheck, BarChart as BarIcon } from "lucide-react";

//participated attended 
const chartColors = ["#00ABE4", "#355070", "#D1D5DB"];

const pieData = [
    { name: "Participated", value: 34 },
    { name: "Attended", value: 24 },
    { name: "Missed", value: 12 },
];
const total = pieData.reduce((sum, d) => sum + d.value, 0);

const stats = [
    {
        label: "Total",
        value: total,
        icon: <Users size={26} className="text-violet-500" />,
        color: "from-violet-500 to-blue-400",
    },
    {
        label: "Participated",
        value: pieData[0].value,
        icon: <BarIcon size={26} className="text-sky-500" />,
        color: "from-sky-400 to-blue-500",
    },
    {
        label: "Attended",
        value: pieData[1].value,
        icon: <CircleCheck size={26} className="text-orange-400" />,
        color: "from-orange-400 to-pink-400",
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl px-3 py-2 border border-gray-200 bg-white text-sm text-gray-900 shadow-md">
                <span className="font-semibold">{payload[0].name}:</span>{" "}
                {payload[0].value}
            </div>
        );
    }
    return null;
};

const EventStatsCard = () => {
    return (
        <div className="w-full mx-auto p-6 rounded-2xl shadow-xl flex  gap-8  md:items-center animate-fade-in">

            <div className="flex-1 min-w-[300px] flex flex-col items-center">
                <div className="w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}  // Increase outer radius
                                innerRadius={60}   // Adjust inner radius for a better visual balance
                                paddingAngle={4}
                                labelLine={false}
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={<CustomTooltip />}
                                wrapperStyle={{ outline: "none" }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={40}
                                iconType="circle"
                                formatter={(value, entry) => (
                                    <span className="text-white text-sm mx-4">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-row flex-wrap gap-4">
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`flex items-center gap-3 bg-gradient-to-r ${s.color} rounded-lg px-4 py-2 shadow hover-scale transition-transform duration-200 min-w-[110px]`}
                        >
                            <div className="flex items-center justify-center rounded-full bg-white bg-opacity-80 p-2 shadow">
                                {s.icon}
                            </div>
                            <div>
                                <span className="block font-bold text-lg text-gray-900 drop-shadow-sm">{s.value}</span>
                                <span className="text-xs text-gray-600">{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default EventStatsCard;
