document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getStudentData");
    const tableData = document.getElementById("tableData");
    const table = document.getElementById("table");
    const dataDiv = document.getElementById("dataDiv");
    
    button.addEventListener("click", async () => {
        try {

            tableData.innerHTML = "";
            
            const res = await axios.get('/student-averages');
            
            console.log(res);
            
            const students = res.data;
            
            console.log(students);
            
            students.forEach(student => {
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
            dataDiv.style.display = "block"
        } catch (e) {
            alert(e.message);
        }
        
    })
})