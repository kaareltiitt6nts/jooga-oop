class TimeUtils {
    static getSeconds(seconds) {
        return seconds * 1000
    }

    static getDays(days) {
        return 1000 * 60 * 60 * days
    }
}

export default TimeUtils