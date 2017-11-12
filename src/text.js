var texts ={
    "surgery": {
        title: "Surgery",
        description: "blabla",
    } ,
    "transplantation":{
        title: "Transplantation",
        description: "blabla",
    }
}

function showMsg(key){
    var t = texts[key];
    $("#knowledge").modal();
    $("#knowledge-title").text(t.title);
    $("#knowledge-description").text(t.description);
}