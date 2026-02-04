//Ensuring that the DOM is fully loaded before anything else happens

document.addEventListener("DOMContentLoaded", () => {
  //Getting the various elements from the document to be used and manipulated
  const tableData = document.getElementById("tableData");
  const table = document.getElementById("table");
  const dataDiv = document.getElementById("dataDiv");

  // DevExtreme Buttons
  $(function () {
    $("#buttonContainer").dxButton({
      text: "Get Data",
      onClick: (e) => {
        getData();
        e.component.option("disabled", true);
      },
      type: "default",
      stylingMode: "contained",
      width: "240",
      icon: "dataarea",
    });
  });

  $(function () {
    $("#exportButtonContainer").dxButton({
      text: "Export Student Data",
      onClick: exportData,
      type: "normal",
      stylingMode: "outlined",
      width: "200",
      icon: "save",
    });
  });

  // ---------------------------------------------------------------------------------------------------------
  // Function being used in buttons

  //Lists to be used to store course names and averages
  const courseNames = [];
  const courseAverages = [];

  
  //Function related to exporting student data to xlsx file
  async function exportData() {
    const wb = XLSX.utils.table_to_book(table, { sheet: "Students" });

    XLSX.writeFile(wb, "Students.xlsx");
  }

  //Function to fetch and display data when button is clicked
  async function getData() {
    DevExpress.ui.notify("Fetching data...");

    try {
      tableData.innerHTML = "";

      const res = await axios.get("/student-averages");

      console.log(res);

      const students = res.data;

      console.log(students);

      students.forEach((student) => {
        const row = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = student.name;

        const average = document.createElement("td");
        average.textContent = student.gradeAverage;

        row.appendChild(name);
        row.appendChild(average);

        tableData.appendChild(row);
      });

      table.style.display = "table";
      dataDiv.style.display = "block";
    } catch (e) {
      DevExpress.ui.notify(e.message);
    }

    //Populating the chart with course average data
    try {
      const res = await axios.get("/course-averages");

      const courseGrades = res.data;

      courseGrades.forEach((course) => {
        courseNames.push(course.course_Name);
        courseAverages.push(course.gradeValue);
      });

      chartCanvas = new Chart("gradesChart", {
        type: "bar",
        data: {
          labels: courseNames,
          datasets: [
            {
              label: "Average Grade",
              data: courseAverages,
              backgroundColor: "rgba(0, 51, 102, 0.8)",
              borderColor: "rgba(0, 51, 102, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    } catch (e) {
      DevExpress.ui.notify(e.message);
    }
  }
});
