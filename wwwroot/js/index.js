// Ensuring that the DOM is fully loaded before anything else happens

document.addEventListener("DOMContentLoaded", () => {
    // Getting the various elements from the document to be used and manipulated
    const dataDiv = document.getElementById("dataDiv");

    // Data for selectBox
    const genderData = ["Male", "Female", "Other", "Prefer not to specify"];

    // Data for tagBox
    const dayData = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    // Number Box
    $(function () {
        $("#numberBoxContainer").dxNumberBox({
            min: 0,
            max: 100,
            showSpinButtons: true,
            label: "What is your favorite number?",
            labelMode: "floating",
            width: 300,
        });
    });

    // Text Box
    $(function () {
        $("#textBoxContainer").dxTextBox({
            label: "What is your name?",
            labelMode: "floating",
            width: 300,
            showClearButton: true,
        });
    });

    // Select Box
    $(function () {
        $("#selectBoxContainer").dxSelectBox({
            dataSource: genderData,
            label: "What is your gender?",
            labelMode: "floating",
            width: 300,
        });
    });

    // Tag Box
    $(function () {
        $("#tagBoxContainer").dxTagBox({
            dataSource: dayData,
            label: "On which days do you work?",
            labelMode: "floating",
            width: 300,
            multiline: true,
            showSelectionControls: true,
        });
    });

    // Button to handle data in boxes
    $(function () {
        $("#dataEntryButton").dxButton({
            text: "Enter Data",
            onClick: (e) => {
                const num = $("#numberBoxContainer")
                    .dxNumberBox("instance")
                    .option("value");
                const text = $("#textBoxContainer")
                    .dxTextBox("instance")
                    .option("value");
                const tag = $("#tagBoxContainer").dxTagBox("instance").option("value");
                const select = $("#selectBoxContainer")
                    .dxSelectBox("instance")
                    .option("value");

                const popup = $("#dataPopup")
                    .dxPopup({
                        contentTemplate: () => {
                            const content = $("<div />");

                            content.append(
                                $("<p />").text(`Your name: ${text || "No name given"}`),
                                $("<p />").text(
                                    `Your favorite number: ${num ?? "None selected"}`,
                                ),
                                $("<p />").text(`Your gender: ${select ?? "None selected"}`),
                                $("<p />").text(
                                    `Your workdays: ${tag.length != 0 ? tag : "None selected"}`,
                                ),
                            );

                            return content;
                        },
                        hideOnOutsideClick: true,
                        width: 400,
                        height: 400,
                        resizeEnabled: true,
                        title: "Your Data",
                    })
                    .dxPopup("instance");

                popup.show();

                e.component.option("disabled", true);

                setTimeout(() => {
                    e.component.option("disabled", false);
                }, 2000);
            },
            type: "normal",
            stylingMode: "contained",
            width: "240",
            icon: "add",
        });
    });

    // DevExtreme Button
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
        $("#addStudentForm").dxForm({
            formData: {
                name: "",
                Math: null,
                Physics: null,
                Chemistry: null,
                Biology: null,
                English: null,
            },
            items: [{
                dataField: "name",
                validationRules: [
                    {
                        type: "required",
                        message: "This field is required"
                    },
                    {
                        type: "stringLength",
                        min: 3,
                        message: "Name must be at least 3 characters long"
                    }
                ]
            },
            {
                dataField: "Math",
                editorType: "dxNumberBox",
                validationRules: [
                    {
                        type: "numeric",
                        message: "Grade must be a number"
                    },
                    {
                        type: "range",
                        max: 100,
                        min: 0,
                        message: "Grade must be between 0 - 100"
                    }
                ]
            },
            {
                dataField: "Physics",
                editorType: "dxNumberBox",
                validationRules: [
                    {
                        type: "numeric",
                        message: "Grade must be a number"
                    },
                    {
                        type: "range",
                        max: 100,
                        min: 0,
                        message: "Grade must be between 0 - 100"
                    }
                ]
            },
            {
                dataField: "Chemistry",
                editorType: "dxNumberBox",
                validationRules: [
                    {
                        type: "numeric",
                        message: "Grade must be a number"
                    },
                    {
                        type: "range",
                        max: 100,
                        min: 0,
                        message: "Grade must be between 0 - 100"
                    }
                ]
            },
            {
                dataField: "Biology",
                editorType: "dxNumberBox",
                validationRules: [
                    {
                        type: "numeric",
                        message: "Grade must be a number"
                    },
                    {
                        type: "range",
                        max: 100,
                        min: 0,
                        message: "Grade must be between 0 - 100"
                    }
                ]
            },
            {
                dataField: "English",
                editorType: "dxNumberBox",
                validationRules: [
                    {
                        type: "numeric",
                        message: "Grade must be a number"
                    },
                    {
                        type: "range",
                        max: 100,
                        min: 0,
                        message: "Grade must be between 0 - 100"
                    }
                ]
            }, {
                itemType: "button",
                buttonOptions: {
                    text: "Add student",
                    type: "success",
                    onClick: addStudent,
                },
            },
            ]
        });
    });

    // ---------------------------------------------------------------------------------------------------------
    // Functions being used in buttons

    // Function to add a new student with their grades
    async function addStudent() {
        const form = $("#addStudentForm").dxForm("instance");

        const result = form.validate();

        if (result.isValid) {
            const data = form.option("formData");

            console.log(data);

            const gradesToSend = [];
            let course_Id = -1;

            for (const key in data) {
                course_Id++;
                if (key != "name" && data[key] != null) {
                    gradesToSend.push({
                        course_Id: course_Id,
                        course_Name: key,
                        gradeValue: data[key],
                    });
                }

            }

            const payload = {
                name: data.name,
                grades: gradesToSend
            };

            console.log(payload);

            try {
                const res = await axios.post("/add-student", payload);

                console.log(res);

                getData();

                DevExpress.ui.notify({ message: "Student list updated", type: "info", displayTime: 3000 });
                DevExpress.ui.notify({ message: "Student added", type: "success", displayTime: 1500 });
            } catch (e) {
                DevExpress.ui.notify("That student already exists!", "error");
            }
        } else {
            DevExpress.ui.notify("Invalid input", "error");
        }
    }


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
                    onRowClick: function (e) {
                        console.log(e.data["id"]);

                        const currentId = e.data["id"];

                        window.open('/student-report');
                    },
                    height: 480,
                    dataSource: students,
                    columns: [
                        {
                            dataField: "Id",
                            visible: false
                        },
                        {
                            dataField: "name",
                            caption: "Student Name",
                        },
                        {
                            dataField: "gradeAverage",
                            caption: "Grade Average",
                        },
                    ],
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
