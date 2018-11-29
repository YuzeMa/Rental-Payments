//convert month from Number to String
export function getMonthToString (monthInNumber) {
    let monthInString = "";
    const month = [ "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
    ];
    monthInString = month[monthInNumber];

    return monthInString;
}

//convert day from String to Number
export function getDayToNumber (dayInString) {
    switch (dayInString)
    {
        case "sunday":
            return 0;
        case "monday":
            return 1;
        case "tuesday":
            return 2;
        case "wednesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        case "saturday":
            return 6;
        default:
            return null;
    }
}

//convert frequency from string to Number in weeks
export function getFrequencyInNumber (frequencyInString){
    switch (frequencyInString){
        case "weekly":
            return 1;
        case "fortnightly":
            return 2;
        case "monthly":
            return 4;
        default:
            return null;
    }
}

//get rent for each day
export function getRentPerDay (rent) {
    return rent/7
}

//add number ordinal
export function addNumberOrdinal (number) {
    if(number >= 0){
        if(number === 11 || number === 12 || number === 13 || number > 100){
            return number+"th"
        }else{
            number = number.toString();
            const numberArray = number.split("");   //split string
            const lastNumber = numberArray[numberArray.length-1];    //get last number
            switch (lastNumber){
                case "1":
                    return number+"st";
                case "2":
                    return number+"nd";
                case "3":
                    return number+"rd";
                default:
                    return number+"th";
            }
        }
    }
}

//convert milliseconds into required date format. eg.1530403200000=>July, 1st 2018
export function dateFormatConversion (dateInMS){
    const dateObj   = new Date(dateInMS);
    let month = dateObj.getMonth();
    month = getMonthToString(month);
    let date = dateObj.getDate();
    date = addNumberOrdinal(date);
    let year = dateObj.getFullYear();
    return month+", "+date+" "+year;
}

//get first payment detail
export function firstPaymentDetail (startDateInMS,paymentDay,rent,frequency){
    const startDay = new Date(startDateInMS).getDay(); // the day start
    const days = Math.abs(paymentDay - startDay)+1;
    const toDateInMS = startDateInMS + (days-1)*24*60*60*1000;
    const amount = (getRentPerDay(rent)*days).toFixed(1);
    const to = dateFormatConversion(toDateInMS);
    const from = dateFormatConversion(startDateInMS);
    const nextToDateInMS = toDateInMS + frequency*7*24*60*60*1000;
    const id = 0;
    return  { from, to, days, amount, nextToDateInMS, id}
}


export function paymentDetail (data){
    const startDateInMS = Date.parse(data.start_date); 
    const endDateInMS = Date.parse(data.end_date); 
    const frequency = getFrequencyInNumber(data.frequency); // frequency: number of weeks
    const paymentDay = getDayToNumber(data.payment_day); // day in number
    const rent = data.rent;

    let paymentDetail = [];
    let nextToDateInMS = 0, fromDateInMS, toDateInMS; 
    let from, to, days, amount, id;
    let i;
    for( i = 0; endDateInMS > nextToDateInMS ;i++){
        if(i===0){
            const firstPayment = firstPaymentDetail(startDateInMS, paymentDay, rent, frequency);
            paymentDetail.push(firstPayment);
            nextToDateInMS = paymentDetail[0].nextToDateInMS;
        }else{
            toDateInMS = nextToDateInMS;
            to = dateFormatConversion(toDateInMS);
            fromDateInMS = toDateInMS - (frequency*7 - 1)*24*60*60*1000;
            from = dateFormatConversion(fromDateInMS);
            days = frequency * 7;
            amount = rent * frequency;
            id = i
            paymentDetail.push({ from, to, days, amount, id})
            nextToDateInMS = toDateInMS + frequency*7*24*60*60*1000;
        }
    }
    // get last payment detail
    fromDateInMS = toDateInMS + 24*60*60*1000;
    from = dateFormatConversion(fromDateInMS);
    to = dateFormatConversion(endDateInMS);
    days = (endDateInMS - fromDateInMS) / (24*60*60*1000);
    amount = (getRentPerDay(rent)*days).toFixed(1);
    id = i
    paymentDetail.push({ from, to, days, amount, id});
    return paymentDetail;
}
