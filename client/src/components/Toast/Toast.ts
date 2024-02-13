import React, { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styled from "tailwind-styled-components";

// Assuming primary, white, green, and red are defined somewhere
const primary = { blue: 'blue' };
const white = 'white';
const green = { green3: 'green3' };
const red = { red4: 'red4' };

const StyledToastContainer = styled(ToastContainer)`
  mt-[60px];
`;

const defaultToastOption = {
    position: 'top-center',
    autoClose: 200,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: false,
    closeButton: false,
};

export const Toast = {
    info: (message: ReactNode, options: any = {}) => {
        toast.info(message, { ...defaultToastOption, ...options });
    },
    success: (message: ReactNode, options: any = {}) => {
        toast.success(message, { ...defaultToastOption, ...options });
    },
    error: (message: ReactNode, options: any = {}) => {
        toast.error(message, { ...defaultToastOption, ...options });
    },
};
