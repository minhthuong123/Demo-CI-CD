const moment = require('moment');
const StringUtil = require('./StringUtil');
class DateTime {
  async getcurentTimeTotimeStamp() {
    const momentDate = moment().format();
    return new Date(momentDate).getTime();
  }

  async getCurrentDateAndTime() {
    let ts_hms = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' }).replace(/T/, ' ').replace(/\..+/, '');
    ts_hms = await StringUtil.replaceAll(ts_hms, '/', '-');
    ts_hms = String(ts_hms).replace(',', '');
    // return mm-dd-yyyy hh:mm:ss AM/PM
    return ts_hms;
  }

  async getCurrentDateTimeWithNum() {
    // Return time num
    let date_time = await this.getCurrentDateAndTime();
    date_time = await StringUtil.replaceAll(date_time, ' ', '');
    date_time = await StringUtil.replaceAll(date_time, '-', '');
    date_time = await StringUtil.replaceAll(date_time, ':', '');
    date_time = await StringUtil.replaceAll(date_time, 'AM', '');
    date_time = await StringUtil.replaceAll(date_time, 'PM', '');
    // return mmddyyyyhhmmss
    return date_time;
  }

  async getCurrentDate() {
    let date_time = (await this.getCurrentDateAndTime()).split(' ');
    let date_s = date_time[0].split('-');
    // return dd/mm/yyyy
    let ddmmyyy = date_s[1] + '/' + date_s[0] + '/' + date_s[2];
    return ddmmyyy;
  }

  async convertMonthToNumber(month_abb) {
    switch (month_abb) {
      case 'Jan':
        return '01';
      case 'Feb':
        return '02';
      case 'Mar':
        return '03';
      case 'Apr':
        return '04';
      case 'May':
        return '05';
      case 'Jun':
        return '06';
      case 'Jul':
        return '07';
      case 'Aug':
        return '08';
      case 'Sep':
        return '09';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
      case 'Dec':
        return '12';
    }
  }

  async convertMonthToMM(month) {
    switch (month) {
      case '1':
        return '01';
      case '2':
        return '02';
      case '3':
        return '03';
      case '4':
        return '04';
      case '5':
        return '05';
      case '6':
        return '06';
      case '7':
        return '07';
      case '8':
        return '08';
      case '9':
        return '09';
      default:
        return month;
    }
  }

  async formatDate(dd_mm_yyyy_time, output_format) {
    // INPUT FORMAT: 30/03/2022 11:12
    let date_time_split = String(dd_mm_yyyy_time).split(' ');
    let date_split = String(date_time_split[0]).split('/');
    let date_time = '';
    switch (output_format) {
      case 'MM/DD/YYYY TIME':
        date_time = date_split[1] + '/' + date_split[0] + '/' + date_split[2] + ' ' + date_time_split[1];
        return date_time;
      default:
        return dd_mm_yyyy_time;
    }
  }

  async formatDDMYYYYtoDDMMYYYY(ddmyyyy) {
    // Input dd/m/yyyy -> dd/mm/yyyy
    let date_split = String(ddmyyyy).split('/');
    let new_mm = await this.convertMonthToMM(String(date_split[1]));
    let ddmmyyyy = date_split[0] + '/' + new_mm + '/' + date_split[2];
    return ddmmyyyy;
  }
}
module.exports = new DateTime();
