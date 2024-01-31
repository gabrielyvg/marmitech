import { Chart } from "react-google-charts";

export const data = [
    ["Month", "Vendido", "Gasto"],
    ["Janeiro", 1000, 400],
    ["Fevereiro", 1170, 460],
    ["Março", 660, 1120],
    ["Abril", 1030, 540],
];

export const options = {
    title: "Gastos/Ganhos por mês",
    curveType: "function",
    legend: { position: "bottom" },
};

export const data2 = [
    ["Dia", "Quantidade"],
    ["Segunda", 10],
    ["Terça", 50],
    ["Quarta", 30],
    ["Quinta", 35],
];

export const options2 = {
    title: "Quantidade vendida por dia",
    curveType: "function",
    legend: { position: "bottom" },
    chart: {
        title: "Quantidade vendida por dia",
        subtitle: "Vendas por dia",
    },
};

export default function Home() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <Chart
                    chartType="LineChart"
                    data={data}
                    options={options}
                    width="100%"
                    height="400px"
                    legendToggle
                />
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data2}
                    options={options2}
                />
            </div>
        </div>
    )
}