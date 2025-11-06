$(document).ready(function() {
    $("#afegeix").click(afegeixDialog);

    const localTasks = localStorage.getItem('tasques');
    if (localTasks !== null) {
        const taskArray = JSON.parse(localTasks);
        if (taskArray.length > 0) {
            // Amaga el missatge de cap tasca
            $('#capTasca').hide();
        }
        for (let i = 0; i < taskArray.length; i++) {
            afegeix(taskArray[i]);
        }
    } else {
        localStorage.setItem('tasques', JSON.stringify([]));
    }
});

function afegeix(taskname) {
    const elem = $(
        '<div class="tasca">' + 
            '<span class="nom">'+taskname+'</span>' +
            '<button class="edita">Edita</button>' +
            '<button class="elimina">&times;</button>' +
        '</div>');
    $(".edita", elem).click(edita);
    $(".elimina", elem).click(elimina);
    $('#list').append(elem);
}
function afegeixDialog() {
    $("#dialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Afegir tasca": function() {
                const taskname = $('input').val();

                const taskArray = JSON.parse(localStorage.getItem('tasques'));
                taskArray.push(taskname);
                localStorage.setItem('tasques', JSON.stringify(taskArray));
                
                afegeix(taskname);
                
                // Amaga el missatge de cap tasca
                if ($('#capTasca').is(':visible')) {
                    $('#capTasca').hide();
                }

                $('input').val("");
                $(this).dialog("close");                        
            },
            Cancel: function() {
            $('input').val("");
            $(this).dialog("close");
            }
        }
    });  
}
function elimina(event) {
    var caller = event.target || event.srcElement;
    $(caller).parent().remove();

    const taskname = $(caller).parent().find('.nom').text();
    const taskArray = JSON.parse(localStorage.getItem('tasques'));
    const index = taskArray.indexOf(taskname);
    taskArray.splice(index, 1);
    localStorage.setItem('tasques', JSON.stringify(taskArray));
    
    // Mostra el missatge de cap tasca si la llista està buida
    if ($('#list').children().length === 0) {
        $('#capTasca').show();
    }
}
function edita(event) {
    var caller = event.target || event.srcElement;
    $("#dialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Editar tasca": function() {
                const taskname = $('input').val();

                const oldTaskName = $(caller).parent().find('.nom').text();
                const taskArray = JSON.parse(localStorage.getItem('tasques'));
                const index = taskArray.indexOf(oldTaskName);
                taskArray[index] = taskname;
                localStorage.setItem('tasques', JSON.stringify(taskArray));
                
                $(caller).parent().find('.nom').text(taskname);

                $('input').val("");
                $(this).dialog("close");
            },
            Cancel: function() {
            $('input').val("");
            $(this).dialog("close");
            }
        }
    });
}