export const getHealthColor = (percentage: number): number => {
    if (percentage >= .66) {
        return 0x00FF00;
    } else if (percentage >= .33) {
        return 0xFFFF00;
    } else {
        return 0xFF0000;
    }
}