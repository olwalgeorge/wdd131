/**
 * W01 Assignment: Home Page
 * Gets the current year and formats the last modified date
 * @author George Olwal
 */

document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.querySelector('#currentyear');
    const lastModifiedElement = document.getElementById('lastModified');
  
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  
    if (lastModifiedElement) {
      const date = new Date();
      const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
      lastModifiedElement.textContent = usDateFormat;
    }
  });