import Calendar from "react-github-contribution-calendar";

const CalendarGrid = ({ submissions }) => {
  var values = {};

  for (let [key, value] of Object.entries(submissions)) {
    values[key] = value;
  }

  var currentDate = new Date();

  // Extract the year, month, and day
  var year = currentDate.getFullYear();
  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  var day = ("0" + currentDate.getDate()).slice(-2);

  // Format the date as "YYYY-MM-DD"
  var formattedDate = year + "-" + month + "-" + day;
  var until = formattedDate;
  var panelColors = ["#383838", "#39d353", "#2CBB5D", "#44A340", "#1E6823"];
  var panelAttributes = { rx: 2, ry: 2 };

  return (
    <Calendar
      panelAttributes={panelAttributes}
      values={values}
      until={until}
      panelColors={panelColors}
    />
  );
};

export default CalendarGrid;
