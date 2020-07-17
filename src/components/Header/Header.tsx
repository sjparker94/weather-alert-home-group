import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { transparentize, lighten } from 'polished';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../interfaces/AppState';
import { temperatureUnitToggle, speedUnitToggle } from '../../actions/settingsActions';

const HeaderStyles = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    border-bottom: 1px solid ${transparentize(0.9, '#fff')};
    height: ${props => props.theme.headerHeight};
    width: 100%;
    padding: 0 ${props => props.theme.gutter};
    display: flex;
    justify-content: space-between;
    background: ${transparentize(0.75, '#000')};
    .logo {
        color: #fff;
        ${props => props.theme.headingFont('700')}
        ${props => props.theme.fontSize(24)}
        letter-spacing: -1px;
        text-shadow: ${props => props.theme.ts};
        transform: rotateY(30deg);
        display: block;
        transition: all 0.75s ${props => props.theme.smoothAnimation};
    }
    .header-logo-wrapper {
        display: flex;
        align-items: center;
        a {
            perspective: 800px;
            &:hover {
                /* transform: rotateY(390deg); */
                .logo {
                    transform: rotateY(calc(30deg + 180deg));
                }
            }
        }
    }
    .header-setting-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        button {
            width: 40px;
            height: 40px;
            border-radius: ${props => props.theme.smallBorderRadius};
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: ${transparentize(0.9, '#FFF')};
            }
        }
        .settings-dropdown {
            padding: ${props => props.theme.gutterPercentage(0.25)} 0;
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 100;
            width: 220px;
            box-shadow: ${props => props.theme.bs};
            background: ${props => lighten(0.05, props.theme.favouritesSidebarBg())};
        }
    }
`;
const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const isFahrenheit = useSelector<AppState, boolean>(state => state.settings.isFahrenheit);
    const isKm = useSelector<AppState, boolean>(state => state.settings.isKm);

    const handleIsFarenheitChange = () => {
        dispatch(temperatureUnitToggle());
    };
    const handleIsKmChange = () => {
        dispatch(speedUnitToggle());
    };
    return (
        <HeaderStyles>
            <div className="header-logo-wrapper">
                <Link to="/">
                    <span className="logo">Weather Connect</span>
                </Link>
            </div>
            <div className="header-setting-wrapper">
                <button
                    aria-label="Open Settings"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        fill="#FFFFFF"
                    >
                        <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                        </g>
                    </svg>
                </button>
                {isSettingsOpen && (
                    <motion.div
                        animate={{
                            opacity: 1,
                            scaleY: 1,
                        }}
                        initial={{
                            opacity: 0,
                            scaleY: 0.5,
                            originY: 0,
                        }}
                        className="settings-dropdown"
                    >
                        <ToggleSwitch
                            name="isFahrenheit"
                            handleChange={handleIsFarenheitChange}
                            size={32}
                            checked={isFahrenheit}
                            label="Temperature unit"
                            checkedString="°F"
                            unCheckedString="°C"
                        />
                        <ToggleSwitch
                            name="isKm"
                            handleChange={handleIsKmChange}
                            size={32}
                            checked={isKm}
                            label="Wind speed unit"
                            checkedString="km/h"
                            unCheckedString="mph"
                        />
                    </motion.div>
                )}
            </div>
        </HeaderStyles>
    );
};

export default Header;
