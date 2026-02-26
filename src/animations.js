// Shared Framer Motion animation variants used across the portfolio

export const fadeUp = {
    hidden: { opacity: 0, y: 40, rotateX: 12, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -40, rotateY: -10 },
    visible: {
        opacity: 1, x: 0, rotateY: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeRight = {
    hidden: { opacity: 0, x: 40, rotateY: 10 },
    visible: {
        opacity: 1, x: 0, rotateY: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.85, rotateX: 8 },
    visible: {
        opacity: 1, scale: 1, rotateX: 0,
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

export const staggerContainerFast = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
};

export const cardHover = {
    rest: { scale: 1, rotateX: 0, rotateY: 0, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        rotateX: -3,
        transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
    },
};

export const buttonTap = {
    tap: { scale: 0.94, rotateX: 6 },
};

export const flipIn = {
    hidden: { opacity: 0, rotateY: -25, scale: 0.92, z: -80 },
    visible: {
        opacity: 1, rotateY: 0, scale: 1, z: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export const viewportOptions = { once: true, margin: '-60px' };
