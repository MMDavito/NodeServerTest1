$("#personForm").submit(function (event) {
    console.log("jeay register FTW");
    var name = $("#name").val();
    var age = Number($("#age").val());
    var data = {
        name: name,
        age: age
    };
    console.log(data);
    event.preventDefault();

});