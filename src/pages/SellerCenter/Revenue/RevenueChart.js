import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { DOMAIN } from '../../../util/config';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);



const RevenueChart = () => {
    const { shopInfo } = useOutletContext();
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const res = await axios.get(`${DOMAIN}/api/chart/get-payment-data`);
            console.log('res', res.data)
            setData(res.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    const total_amount = data.reduce((sum, d) => sum + d.total_amount, 0);

    useEffect(() => {
        console.log('shopInfo', shopInfo)
        fetchData()
    }, [])
    //--------------- Bar-chart--------------------------------
    const dataBarChart = {
        labels: data.map(d => d.payment_method),
        datasets: [
            {
                label: "Số Lượt Thanh Toán",
                data: data.map(d => d.total_amount),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };
    const barChartoptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Biểu Đồ Phương Thức Thanh Toán" },
            datalabels: {
                anchor: 'end',
                align: 'top',
                offset: 4,
                formatter: function (value) {
                    return (value / 1_000_000_000).toFixed(1) + ' Tỷ';
                },
                font: { weight: 'bold', size: '12vw' },
                color: '#1250dc',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Phương Thức Thanh Toán',
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
                    text: 'Số Tiền',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#333',
                },
                ticks: {
                    callback: function (value) {
                        return (value / 1000000000) + ' Tỷ';
                    }
                },
                beginAtZero: true,
            },
        },

    };
    // ---------------Pie-chart-------------------------------
    const dataPieChart = {
        labels: data.map(d => d.payment_method),
        datasets: [
            {
                label: "Số Lượt Thanh Toán",
                data: data.map(d => d.total_amount),
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
                <div >
                    <div style={{ fontSize: '1.2vw', fontWeight: '500' }}>Tổng Doanh Thu</div>
                    <div className='card w-50 mx-auto mb-4' style={{ padding: '3.5vw', borderRadius: '1rem', fontSize: '2vw', fontWeight: '700', color: '#1250dc' }}>
                        {total_amount / 1000000000}Tỷ
                    </div>

                </div>
                <Bar data={dataBarChart} options={barChartoptions} />
            </div>
            <div style={{ flex: 1 }}>
                <Pie data={dataPieChart} options={pieChartoptions} />
            </div>
        </div>
    );
};

export default RevenueChart;
