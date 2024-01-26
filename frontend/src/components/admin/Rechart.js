import React, { PureComponent } from "react";
import {LineChart,Line,XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";

const data = [
    {
        name: "Page A",
        uv: 2000,
    },
    {
        name: "Page B",
        uv: 3000,
    },
    {
        name: "Page C",
        uv: 2000,
    },
    {
        name: "Page D",
        uv: 2780,
    },
    {
        name: "Page E",
        uv: 1890,
    },
    {
        name: "Page F",
        uv: 2390,
    },
    {
        name: "Page G",
        uv: 3490,
    },
];

export default class Rechart extends PureComponent {
   
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500}height={300}data={data}margin={{top: 5,right: 30,left: 20,bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}