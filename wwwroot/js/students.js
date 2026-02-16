document.addEventListener("DOMContentLoaded", async () => {
    getData();

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

    async function getData() {
        DevExpress.ui.notify("Fetching data...");

        try {
            const res = await axios.get("/students");

            const students = res.data;

            const studentGrades = students.map(student => {
                let average = 0;
                let num = 0;

                const row = { id: student.id, name: student.name };
                student.grades.forEach(grade => {
                    row[grade.course_Name] = grade.gradeValue;
                    average += grade.gradeValue;
                    num++;
                });

                row["Average"] = average / num;
                return row;
            });

            console.log(studentGrades[0]);

            $(function () {
                $("#studentDataGrid").dxDataGrid({
                    dataSource: studentGrades,
                    columns: [
                        { dataField: "id", caption: "ID", allowEditing: false },
                        { dataField: "name", caption: "Student Name", allowEditing: false },
                        {
                            dataField: "Math", validationRules: [{ type: "range", min: 0, max: 100, message: "Grade must be 0–100" }]
                        },
                        { dataField: "Physics", validationRules: [{ type: "range", min: 0, max: 100, message: "Grade must be 0–100" }] },
                        { dataField: "Chemistry", validationRules: [{ type: "range", min: 0, max: 100, message: "Grade must be 0–100" }] },
                        { dataField: "Biology", validationRules: [{ type: "range", min: 0, max: 100, message: "Grade must be 0–100" }] },
                        { dataField: "English", validationRules: [{ type: "range", min: 0, max: 100, message: "Grade must be 0–100" }] },
                        {
                            dataField: "Average", allowEditing: false
                        }
                    ],
                    editing: {
                        mode: "popup",
                        allowUpdating: true,
                        allowDeleting: true,
                    },
                    showBorders: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        width: 240,
                        placeholder: "Search...",
                    },
                    export: {
                        enabled: true,
                        formats: ["xlsx"],
                    },
                    onRowUpdated: async (e) => {
                        try {
                            const data = e.data;
                            console.log(data);

                            const gradesToSend = [];
                            let course_Id = -2;

                            for (const key in data) {
                                course_Id++;
                                if (key != "name" && key != "id" && key != "Average" && data[key] != null) {
                                    gradesToSend.push({
                                        course_Id: course_Id,
                                        course_Name: key,
                                        gradeValue: data[key],
                                    });
                                }

                            }

                            const payload = {
                                id: data.id,
                                name: data.name,
                                grades: gradesToSend
                            };

                            console.log(payload);

                            try {
                                const res = await axios.post("/update-student", payload);

                                console.log(res);

                                getData();

                                DevExpress.ui.notify({ message: "Student list updated", type: "info", displayTime: 3000 });
                            } catch (e) {
                                DevExpress.ui.notify("That student already exists!", "error");
                            }
                        } catch (e) {
                            DevExpress.ui.notify(e.message);
                        }
                    },
                    onRowRemoved: async (e) => {
                        try {
                            const id = e.data["id"];
                            DevExpress.ui.notify(`Deleting student with ID ${id}...`);

                            const res = await axios.post("/delete-student", e.data);
                        } catch (e) {
                            DevExpress.ui.notify(e.message);
                        }
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
                                "StudentGrades.xlsx",
                            );
                        } catch (e) {
                            DevExpress.ui.notify(e.message);
                        }
                    },
                });
            });
        } catch (e) {
            DevExpress.ui.notify(e.message, "error");
        }
    }

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
});