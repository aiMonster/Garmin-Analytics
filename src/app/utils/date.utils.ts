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
     * Retrives only date from YYYY-MM-DD HH:MM:SS
     * @param date input date
     * @returns date in format YYYY-MM-DD
     */
    public static getDate(date: string): string {
        return date.split(' ')[0];
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

        const startDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const stopDateUTC = Date.UTC(stopDate.getFullYear(), stopDate.getMonth(), stopDate.getDate());

        let currentDateUTC = startDateUTC;

        while (currentDateUTC <= stopDateUTC) {
            dateArray.push(new Date(currentDateUTC));
            currentDateUTC += 24*60*60*1000;
        }

        return dateArray;
    }
}
