document.addEventListener("DOMContentLoaded", async () => {

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
                    allowAdding: true
                },
            });
        });
    } catch (e) {
        DevExpress.ui.notify(e.message, "error");
    }

});