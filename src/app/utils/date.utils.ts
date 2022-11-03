export class DateUtils {
    /** Collection of Months lables like JAN, FEB, etc. */
    public static readonly MonthsList = 
        Object.freeze(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);

    /** Collection of Months lables like January, February, etc. */
    public static readonly MonthsFullList = 
        Object.freeze(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

    /**
     * Converts date to string
     * @param date input date
     * @returns date in format YYYY-MM-DD
     */
    public static convert(date: Date): string {
        return date.toJSON().split('T')[0];
    }

    /**
     * Formats date to readable string
     * @param date 
     * @returns date as label '11 Jan 2021'
     */
    public static formatDate(date: Date): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getUTCDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    /**
     * Returns the list of dates between start and stop dates
     * @param startDate start date
     * @param stopDate end date
     * @returns collection of dates between the range
     */
    public static getAllDatesInTheRange(startDate: Date, stopDate: Date): Date[] {
        const dateArray: Date[] = []

        const startDateIgnoreTimezone = this.getPureDate(startDate);
        const stopDateIgnoreTimezone = this.getPureDate(stopDate);

        let currentDate = new Date(startDateIgnoreTimezone);

        while (currentDate <= stopDateIgnoreTimezone) {
            dateArray.push(this.getPureDate(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    }   

    /**
     * Get date with ignored timezone
     * @param date input date
     * @returns date with modified hours to ignore time zone
     */
    private static getPureDate(date: Date): Date {
        const result = new Date(date);

        result.setHours(result.getHours() - result.getTimezoneOffset() / 60);
        result.setMinutes((result.getHours() - result.getTimezoneOffset()) % 60);

        return result;
    }
}
