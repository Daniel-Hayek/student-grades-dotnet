// Ensuring that the DOM is fully loaded before anything else happens

document.addEventListener("DOMContentLoaded", () => {
  // Getting the various elements from the document to be used and manipulated
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

  // ---------------------------------------------------------------------------------------------------------
  // Functions being used in buttons

  // Function to fetch and display data when button is clicked
  async function getData() {
    DevExpress.ui.notify("Fetching data...");

    try {
      // Fetching and testing student data
      const res = await axios.get("/student-averages");

      console.log(res);

      const students = res.data;

      console.log(students);

      // Rendering dxDataGrid
      $(function () {
        $("#studentDataDiv").dxDataGrid({
          export: {
            enabled: true,
            formats: ["xlsx"],
          },
          onExporting: async (e) => {
            try {
              DevExpress.ui.notify("Exporting student data...");

              const workbook = new ExcelJS.Workbook();
              const worksheet = workbook.addWorksheet("Main sheet");

              await DevExpress.excelExporter.exportDataGrid({
                worksheet: worksheet,
                component: e.component,
              });

              const buffer = await workbook.xlsx.writeBuffer();

              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "StudentData.xlsx",
              );
            } catch (e) {
              DevExpress.ui.notify(e.message);
            }
          },
          height: 480,
          dataSource: students,
          keyExpr: "name",
          paging: {
            pageSize: 10,
          },
          selection: {
            mode: "single",
          },
          showBorders: true,
          rowAlternationEnabled: true,
          searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search...",
          },
        });
      });

      dataDiv.style.display = "block";
    } catch (e) {
      DevExpress.ui.notify(e.message);
    }

    // Creating chart
    try {
      // Getting course data
      const res = await axios.get("/course-averages");

      const courseGrades = res.data;

      // dxChart
      $(function () {
        $("#chartContainer").dxChart({
          dataSource: courseGrades,
          series: [
            {
              type: "bar",
              argumentField: "course_Name",
              valueField: "gradeValue",
              name: "Course Averages",
              color: "#b98356",
            },
          ],
          valueAxis: {
            min: 0,
            max: 100,
            visualRange: {
              startValue: 0,
              endValue: 100,
            },
            tickInterval: 10,
            constantLines: [
              {
                value: 60,
                label: { text: "Passing" },
              },
            ],
          },
          tooltip: {
            enabled: true,
          },
          legend: {
            visible: false,
          },
        });
      });
    } catch (e) {
      DevExpress.ui.notify(e.message);
    }
  }
});
