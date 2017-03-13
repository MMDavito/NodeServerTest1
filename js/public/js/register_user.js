$("#personForm").submit(function (event) {
    console.log("jeay register FTW");
    var name = $("#name").val();
    var age = Number($("#age").val());
    var data = {
        name: name,
        age: age
    };
//    data = JSON.parse(data);
    console.log(data);
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: "http://localhost:3000/user",
        success: function (data) {
            console.log('success');
            console.log(data);
        }
    });
    $("#age").val(null);
    $("#name").val("");
    
    event.preventDefault();

});