document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("getStudentData");
    
    button.addEventListener("click", async () => {
        try {

            const res = await axios.get('/student-averages');
            
            console.log(res);

        } catch (e) {
            alert(e.message);
        }

    })
})