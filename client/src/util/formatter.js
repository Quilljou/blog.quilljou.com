export default {
  slashDate (time) {
    time = new Date(time);
    const year = String(time.getFullYear()).slice(-2);
    const month = format(time.getMonth() + 1);
    const date = format(time.getDate());
    return `${year}/${month}/${date}`

    function format(s) {
      if(s <= 9) return `0${s}`
      return s;
    }
  }
}
