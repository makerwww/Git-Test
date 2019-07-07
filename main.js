const oneSec = () => 1000
const getCurDate = () => new Date()
const cleareLog = () => console.clear()
const logMess = message => consol.log(message)

const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
})

const civilianHours = clockTime => ({
    ...clockTime,
    hours: (clockTime.hours > 12) ? clockTime.hours-12 : clockTime.hours 
})

const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: (clockTime.hours >= 12) ? "PM" : "AM"
})

const display = target => time => target(time)

const formatClock = format => time => 
format.replace("hh", time.hours)
      .replace("mm", time.minutes)
      .replace("ss", time.seconds)
      .replace("tt", time.ampm)
      
const prependZero = key => clockTime => ({
    ...clockTime,
    [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
})

const convertToCivil = clockTime => compose(appendAMPM,civilianHours)(clockTime)

const doubleDigits = civilTime => compose(prependZero('hours'), prependZero('minutes'), prependZero('seconds'))(civilTime)

const startTicking = () => setInterval(compose(
    cleareLog,
    getCurDate,
    serializeClockTime,
    convertToCivil,
    doubleDigits,
    formatClock("hh:mm:ss tt"),
    display(log)
), oneSec())

startTicking()






