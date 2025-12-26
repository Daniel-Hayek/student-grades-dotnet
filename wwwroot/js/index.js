document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("getStudentData");
  const tableData = document.getElementById("tableData");
  const table = document.getElementById("table");
  const dataDiv = document.getElementById("dataDiv");
  const exportButton = document.getElementById("exportData");

  const studentNames = [];
  const studentGrades = [];

  button.addEventListener("click", async () => {
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
        studentNames.push(student.name);

        const average = document.createElement("td");
        average.textContent = student.gradeAverage;
        studentGrades.push(student.gradeAverage);

        row.appendChild(name);
        row.appendChild(average);

        tableData.appendChild(row);
      });

      table.style.display = "table";
      dataDiv.style.display = "block";
    } catch (e) {
      alert(e.message);
    }
  });

  exportButton.addEventListener("click", async () => {
    const wb = XLSX.utils.table_to_book(table, { sheet: "Students" });

    XLSX.writeFile(wb, "Students.xlsx");
  });

  chartCanvas = new Chart("gradesChart", {
    type: "bar",
    data: {
      labels: studentNames,
      datasets: [
        {
          label: "Average Grade",
          data: studentGrades,
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
});
