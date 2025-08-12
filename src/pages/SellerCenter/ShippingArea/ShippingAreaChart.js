import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { DOMAIN } from '../../../util/config';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);



const ShippingAreaChart = () => {
    const { shopInfo } = useOutletContext();
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const res = await axios.get(`${DOMAIN}/api/chart/get-shipping-data`);
            console.log('res', res.data);
            setData(res.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }


    useEffect(() => {
        console.log('shopInfo', shopInfo)

        fetchData()
    }, [])
    const dataChart = {
        labels: data.map(d => d.province),
        datasets: [
            {
                label: "Lượt Ship",
                data: data.map(d => d.province_area_count),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Biểu đồ Lượt Ship Sản Phẩm Theo Khu Vực" },
            datalabels: {
                anchor: 'end',
                align: 'top',
                offset: 4,
                formatter: (value) => value,
                font: { weight: 'bold', size: '15vw' },
                color: '#1250dc',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tỉnh',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#333',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Lượt Ship',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#333',
                },
                beginAtZero: true,
            },
        },

    };
    // ----------------------Pie-Chart--------------------------------
    const dataPieChart = {
        labels: data.map(d => d.province),
        datasets: [
            {
                label: "Số Lượt Thanh Toán",
                data: data.map(d => d.province_area_count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,

            },
        ],
    };
    const pieChartoptions = {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
            title: { display: true, text: ' % Tiền Theo Phương Thức Thanh Toán' },
            datalabels: {
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0];
                    const total = dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = (value / total * 100).toFixed(1);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: { weight: 'bold', size: 14 },
            },
        },
    };
    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
                  <Bar data={dataChart} options={options} />
            </div>
            <div style={{ flex: 1 }}>
                 <Pie data={dataPieChart} options={pieChartoptions} />
            </div>
        </div>
    );
};

export default ShippingAreaChart;
