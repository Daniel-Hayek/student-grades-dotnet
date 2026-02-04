//Ensuring that the DOM is fully loaded before anything else happens

document.addEventListener("DOMContentLoaded", () => {
  //Getting the various elements from the document to be used and manipulated
  const button = document.getElementById("getStudentData");
  const tableData = document.getElementById("tableData");
  const table = document.getElementById("table");
  const dataDiv = document.getElementById("dataDiv");
  const exportButton = document.getElementById("exportData");

  $(function () {
    $("#buttonContainer").dxButton({
      text: "Click me!",
      onClick: function () {
        alert("Hello World!");
      },
    });
  });

  // ---------------------------------------------------------------------------------------------------------
  // Initial Project Specs (Leaving it as is for reference and functionality)

  //Lists to be used to store course names and averages
  const courseNames = [];
  const courseAverages = [];

  //Button that calls the API to retrieve data from backend
  button.addEventListener("click", async () => {
    //Populating the grid view table with the student data
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
      alert(e.message);
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
      alert(e.message);
    }
  });

  //Button related to exporting student data to xlsx file
  exportButton.addEventListener("click", async () => {
    const wb = XLSX.utils.table_to_book(table, { sheet: "Students" });

    XLSX.writeFile(wb, "Students.xlsx");
  });
});
