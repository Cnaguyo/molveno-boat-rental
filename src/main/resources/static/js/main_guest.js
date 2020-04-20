function getGuests() {
    $.get('api/guests', function (guests) {
        displayGuests(guests);
    });
}

$(document).ready(function () {

    $('#createGuestButton').click(function () {
        $('#guestCreatePop').modal("show");
        $('#CreateguestNameInput').val('');
        $('#CreateguestIdTypeInput').val('');
        $('#CreateguestIdNumberInput').val('');
        $('#CreateguestPhoneNumberInput').val('');
    });
    $('#savePop').click(createGuest);
    getGuests();
    $('#confirmDelete').click(removeGuest);
    $('#editPop').click(createEditGuest);
});


var guestIdDelete;
var guestIdEdit;
function displayGuests(guests) {
    var guestContainer = $('#guestContainer');
    guestContainer.empty();
    $.each(guests, function (index, guest) {
        $('#guestContainer').append(' <tr><td> ' + guest.name + '  </td><td> ' + guest.idType + '  </td><td> ' + guest.idNumber + '  </td><td> ' + guest.phoneNumber + '  </td><td> '  + '  </td><td><button class="remove-button" guestId="' + guest.id + '">delete</button></td><td><button class="edit-button" guestId="' + guest.id + '">edit</button></td></tr>');
    });

    $('#guestContainer .remove-button').click(function () {
        guestIdDelete = $(this).attr('guestId');

        $('#AreYouSure').modal({ backdrop: 'static', keyboard: false });
    });
    $('#guestContainer .edit-button').click(function () {
        // var guestData=


        guestIdEdit = $(this).attr('guestId');


         $.get('api/guests/' + guestIdEdit, function (guest) {

             $('#guestEditPop').modal({ backdrop: 'static', keyboard: false });
             $('#guestNameInput').val(guest.name);
             $('#guestIdTypeInput').val(guest.idType);
             $('#guestIdNumberInput').val(guest.idNumber);
             $('#guestPhoneNumberInput').val(guest.phoneNumber);
         });
    });

}

function postGuest(guest) {
    var jsonGuest = JSON.stringify(guest);
    $.ajax({
        url: "api/guests",
        type: "post",
        contentType: "application/json",
        data: jsonGuest,
        success: function () {
            alert('i created a new guest.');
            $('#guestCreatePop').modal("hide");
            getGuests();
        },
        error: function () {
            $('#guestCreatePop').modal("hide");
            alert(' oops..something is wrong!');
        }
    });
}
function createGuest() {
    var guestName = $('#CreateguestNameInput').val();
    var guestIdType = $('#CreateguestIdTypeInput').val();
    var guestIdNumber = $('#CreateguestIdNumberInput').val();
    var guestPhoneNumber = $('#CreateguestPhoneNumberInput').val();
    if (!guestName) {
        $("#noName").modal("show");
        return;
    }
    if (guestName.length < 3) {
        $("#tooShort").modal("show");
        return;
    }
    var guest = {
        name: guestName,
        idType: guestIdType,
        idNumber: guestIdNumber,
        phoneNumber:guestPhoneNumber

    };
    postGuest(guest);
}

function removeGuest() {
    var guestId = guestIdDelete;
    $.ajax({
        url: 'api/guests/' + guestId,
        type: "DELETE",
        success: function () {
            getGuests();
            $("#areYousure").modal("hide");

        },
        error: function () {
            $("#areYouSure").modal("hide");
            alert('You can not delete a guest ..');
        }

    });

}
function editGuest(guest) {
    var jsonGuest = JSON.stringify(guest);
    $.ajax({
        url: 'api/guests/' + guestIdEdit,
        type: 'PUT',
        contentType: "application/json",
        data: jsonGuest,
        success: function () {
            alert('you edited the guest.');
            getGuests();
            $("#guestEditPop").modal("hide");
        },
        error: function () {
            $("#guestEditPop").modal("hide");
            alert('oops..something is wrong.' + guestIdEdit);
        }
    });
}

function createEditGuest() {

    var guestName = $('#guestNameInput').val();
    var guestIdType = $('#guestIdTypeInput').val();
    var guestIdNumber = $('#guestIdNumberInput').val();
    var guestPhoneNumber = $('#guestPhoneNumberInput').val();
    if (!guestName) {
        $("#noName").modal("show");
        return;
    }
    if (guestName.length < 3) {
        $("#tooShort").modal("show");
        return;
    }
    var guest = {
        name: guestName,
        idType: guestIdType,
        idNumber: guestIdNumber,
        phoneNumber:guestPhoneNumber
    };
    editGuest(guest);
}