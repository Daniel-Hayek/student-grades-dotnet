document.addEventListener("DOMContentLoaded", async () => {
    console.log("Loaded");

    try {
        const res = await axios.get("/students");

        const students = res.data;

        console.log(students);


        $(function () {
            $("#studentDataGrid").dxDataGrid({
                dataSource: students,

            });
        });
    } catch (e) {
        DevExpress.ui.notify(e.message, "error");
    }

});