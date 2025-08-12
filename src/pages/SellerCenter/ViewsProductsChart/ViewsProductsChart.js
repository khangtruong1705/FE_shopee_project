import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { DOMAIN } from '../../../util/config';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);



const ViewsProductsChart = () => {
    const { shopInfo } = useOutletContext();
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const res = await axios.get(`${DOMAIN}/api/chart/get-views-products-by-shopid/${shopInfo.shop_name_id}`);
            console.log('label', data.map(d => d.name));
            console.log('data', data.map(d => d.view_count));
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
        labels: data.map(d => d.name),
        datasets: [
            {
                label: "Lượt Xem Sản Phẩm",
                data: data.map(d => d.view_count),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Biểu đồ Lượt Xem Sản Phẩm" },
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
                    text: 'Sản Phẩm',
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
                    text: 'Lượt Xem',
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
    return (
        <div>
            <Bar data={dataChart} options={options} />
        </div>
    );
};

export default ViewsProductsChart;
