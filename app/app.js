function initListeners(){
    $("#submit").on("click", (e) => {
        e.preventDefault();

        //obtain values
        let fName = $("#first-name").val();
        let lName = $("#last-name").val();
        let age = $("#age").val();
        let phone = $("#phone").val();
        let email = $("#email").val();
        let studId = $("#stud-id").val();

        let cs = $("#cls").val();
        let newClassArr = cs.split(",");
        let finalClassArr = [];
        $.each(newClassArr, (idx, newClass) => {
            let cl = {
                className: newClass.trim()
            }

            finalClassArr.push(cl);
        });

        let studObj = {
            firstName: fName,
            lastName: lName,
            age: age,
            phone: phone,
            email: email,
            studentID: studId,
            classes: []
        }

        studObj.classes = finalClassArr;

        addStudent(studObj);

        getRoster();
    })


    $("#getStudents").on("click", (e) => {
        e.preventDefault();

        getRoster();
    })
}

function addStudent(student){
    let studRoster = JSON.parse(localStorage.getItem("Roster"));
    studRoster.push(student);
    
    // reset values
    $("#first-name").val("");
    $("#last-name").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#stud-id").val("");
    $("#cls").val("");

    //send to local storage
    localStorage.setItem("Roster", JSON.stringify(studRoster));

}

function getRoster(){
    $("#students").html("");

    let studRoster = JSON.parse(localStorage.getItem("Roster"));

    $.each(studRoster, (idx, student) => {
        $("#students").append(`<p>Name: ${student.firstName} ${student.lastName}</p><p>Student ID: ${student.studentID}</p><p>Age: ${student.age}</p><p>IU Email: ${student.email}</p><p>Phone: ${student.phone}</p>`);

        $.each(student.classes, (idx, cls) => {
            $("#students").append(`<p>Class: ${cls.className}</p>`)
        })
    })
}

function connectToStorage(){
    if(localStorage){
        let roster = localStorage.getItem("Roster");

        if(roster){
            getRoster();
        }else{
            localStorage.setItem("Roster","[]");
        }
    }else{
        console.log("No storage detected.")
    }
}

$(document).ready(function(){
    initListeners(); 
    connectToStorage();
});