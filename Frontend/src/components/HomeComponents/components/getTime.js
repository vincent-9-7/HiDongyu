export default function getTime () {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const day = new Date().getDate()
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  const seconds = new Date().getSeconds()

  const timeNow = `${year}-`+
  `${month<10?(`0${month+1}`):month}-`+
  `${day<10?(`0${day}`):day}`+
  `T${hour<10?(`0${hour}`):hour}`+
  `:${minute<10?(`0${minute}`):minute}`+
  `:${seconds<10?(`0${seconds}`):seconds}`
  return (timeNow)
}