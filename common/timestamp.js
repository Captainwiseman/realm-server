import moment from "moment"

  export function getDateTime() {
    return moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
  }