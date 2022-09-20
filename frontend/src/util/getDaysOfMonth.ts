export const getDaysOfMonth = (month: number, year?: number): Date[] => {
    let dayIterator = new Date(year || new Date().getFullYear(), month, 1)
    const days: Date[] = []
    do {
        days.push(dayIterator)
        dayIterator = new Date(dayIterator.getFullYear(), dayIterator.getMonth(), dayIterator.getDate() + 1)
    } while (dayIterator.getMonth() === month)
    return days
}
