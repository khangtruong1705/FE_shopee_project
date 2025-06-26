import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { useLocation } from 'react-router-dom';
import { DOMAIN } from '../../util/config';

const Chart = () => {
    const containerRef = useRef(null);
    const dashboardId = process.env.REACT_APP_SUPERSET_DASHBOARDID;
    const supersetDomain = process.env.REACT_APP_SUPERSET_DOMAIN;
    const location = useLocation();
    const state = location.state;
    const getGuestToken = async () => {
        try {
            const response = await axios.get(`${DOMAIN}/api/users/get-superset-guest-token`, {
                params: { dashboard_id: dashboardId,shop_id:state.shop_id },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching guest token:', error.response?.data || error.message);
            return null;
        }
    };

    useEffect(() => {
        const embed = async () => {
            if (!containerRef.current) return;
            await embedDashboard({
                id: dashboardId,
                supersetDomain: supersetDomain,
                mountPoint: containerRef.current,
                fetchGuestToken: getGuestToken,
                dashboardUiConfig: {
                    hideTitle: true,
                    hideTab: true,
                    hideChartControls: true,
                    filters: { expanded: false },
                },
            });
        };

        embed();
        let iframe = document.querySelector("iframe")
        if (iframe) {
            iframe.style.width = '100%'
            iframe.style.height = '90vh'
        }
        console.log('DOMAIN',DOMAIN)
    }, []);
    return (
        <div>
            <h1 className='text-center'>Statistics Charts Dashboard</h1>
            <div ref={containerRef} />
        </div>
    );
};

export default Chart;
