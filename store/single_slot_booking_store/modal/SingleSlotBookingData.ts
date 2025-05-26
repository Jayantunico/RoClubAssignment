
interface DateAndTime {
    date: Date | undefined,
    time: { from: string, to: string }
}

interface Scanner {
    value: {
        organization_name: string;
        address: string;
        profile_picture: string;
        id: number;
    } | undefined
}

interface Exams {
    value: {
        examination?: string,
        skill?: string
    }[] | []
}
interface Comments {
    value: string
}
export interface SingleSlotBookingData {
    form1: DateAndTime
    form2: Scanner
    form3: Exams
    form4: Comments
}