import React from 'react';
import ErrorAlertBoxStyles from './ErrorAlertBoxStyles';

export type Sizes = 'small' | 'form';

interface Props {
    size?: Sizes;
    marginBottom?: string;
    error: string;
}

const ErrorAlertBox: React.FC<Props> = ({ error, marginBottom, size }) => {
    const animationValues = {
        x: [-10, 10, -20, 10, 0],
    };
    const transitionValues = {
        duration: 0.3,
        ease: 'easeInOut',
        loop: 1,
    };
    return (
        <ErrorAlertBoxStyles
            animate={animationValues}
            transition={transitionValues}
            marginBottom={marginBottom}
            size={size}
        >
            <p>{error}</p>
        </ErrorAlertBoxStyles>
    );
};

export default ErrorAlertBox;
