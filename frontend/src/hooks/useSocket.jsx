import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const WebSocketContext = createContext({ socket: null, isConnected: false });

const URL = 'wss://whack-a-mole-hc23.onrender.com';

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(URL);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(ws);
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
