var trip_id;
var tripDataTable;
var returned_boats=0;

$(document).ready(function () {

$("#checkforBoats").click(function(){
    returned_boats = $.ajax ({
        url: 'api/boats/'+ Number($('#numOfPersons').val()), 
       async: false, 
       dataType: 'json', 
    }).responseJSON;

    $("#returnedBoatno").text('');
    console.log(returned_boats.id);
    $("#returnedBoatno").append(returned_boats.id);
});

    $('#createTripButton').click(function () {
        createTrip();
      //  $('#tripCreatePop').modal("show");
        // $('#CreatetripDurationInput').val('');
        // $('#CreatetripStart_timeInput').val('');
        // $('#CreatetripEnd_timeInput').val('');
        // $('#CreatetripNumOfPersonsInput').val('');
        // $('#CreatetripTotalPriceInput').val('');
        // $('#CreatetripTripEndedInput').val('');
    });

    $('#savePop').click(createTrip);
    getTrips();
    $('#confirmDelete').click(removeTrip);
    $('#editPop').click(createEditTrip);

});




function displayTrips(trips) {
    var tripContainer = $('#tripContainer');
    tripContainer.empty();
    $.each(trips, function (index, trip) {
        $('#tripContainer').append(' <tr><td> '
         + trip.id + '  </td><td> ' + 
         trip.start_time + '  </td><td> ' + trip.end_time + '  </td><td> '
           + `${returned_boats.id}`+
            '</td><td><button class="remove-button" tripId="' + trip.id + '">stop</button></td></tr>');
    });

    $('#tripContainer .remove-button').click(function () {
        tripIdDelete = $(this).attr('tripId');

        $('#AreYouSure').modal({ backdrop: 'static', keyboard: false });
    });
    
    $('#tripContainer .edit-button').click(function () {
        var tripData;


        tripIdEdit = $(this).attr('tripId');

        // $.ajax({
        //     url: 'api/trips/'+ tripIdEdit,
        //     type: "PUT",
        //     data
        // })

         $.get('api/trips/' + tripIdEdit, function (trip) {

             $('#tripEditPop').modal({ backdrop: 'static', keyboard: false });
             $('#tripDurationInput').val(trip.duration);
             $('#tripStart_timeInput').val(trip.start_time);
             $('#tripEnd_timeInput').val(trip.end_time);
             $('#tripNumOfPersonsInput').val(trip.numOfPersons);
             $('#tripTotalPriceInput').val(trip.totalPrice);
             $('#tripEndedInput').val(trip.tripEnded);


         });
    });

}

function postTrip(trip) {
    var jsonTrip = JSON.stringify(trip);
    $.ajax({
        url: "api/trips",
        type: "post",
        contentType: "application/json",
        data: jsonTrip,
        success: function () {
            alert('i created a new trip.');
          //  $('#tripCreatePop').modal("hide");
            getTrips();
        },
        error: function () {
          //  $('#tripCreatePop').modal("hide");
            alert(' oops..something is wrong!');
        }
    });
}

function createTrip() {
    // var tripDuration = $('#CreatetripDurationInput').val();
    // var tripStart_time = $('#CreatetripStart_timeInput').val();
    // var tripEnd_time = $('#CreateTripEnd_timeInput').val();
    // var tripNumOfPersons = $('#CreatetripNumOfPersonsInput').val();
    // var tripTotalPrice = $('#CreatetripTotalPriceInput').val();
    // var tripTripEnded = $('#CreatetripTripEndedInput').val();
    // if (!tripDuration) {
    //     $("#Duration is set").modal("show");
    //     return;
    // }
    // if (tripDuration.length < 3) {
    //     $("#durationSet").modal("show");
    //     return;
    // }
    var trip = {
        status:'ongoing',
        boat: {
            id:returned_boats.id,
        },
    };
    postTrip(trip);
}

function removeTrip() {
    var tripId = tripIdDelete;
    $.ajax({
        url: 'api/trips/' + tripId,
        type: "DELETE",
        success: function () {
            getTrips();
            $("#areYousure").modal("hide");

        },
        error: function () {
            $("#areYouSure").modal("hide");
            alert('You can not delete a trip ..');
        }

    });

}

function editTrip(trip) {
    var jsonTrip = JSON.stringify(trip);
    $.ajax({
        url: 'api/trips/' + tripIdEdit,
        type: 'PUT',
        contentType: "application/json",
        data: jsonTrip,
        success: function () {
            alert('you edited the trip.');
            getTrips();
            $("#tripEditPop").modal("hide");
        },
        error: function () {
            $("#tripEditPop").modal("hide");
            alert('oops..something is wrong.' + tripIdEdit);
        }
    });
}

function createEditTrip() {

    var tripDuration= $('#tripDurationInput').val();
    var tripStart_time = $('#TripStart_timeIdTypeInput').val();
    var tripEnd_time = $('#tripEnd_timeInput').val();
    var tripNumOfPersons = $('#tripNumOfPersonsInput').val();
    if (!tripDuration) {
        $("#noDuration").modal("show");
        return;
    }
    if (tripDuration.length < 3) {
        $("#tooShort").modal("show");
        return;


    }
    var trip = {
        duration: tripDuration,
        start_time: tripStart_time,
        end_time: tripEnd_time,
        totalPrice: tripTotalPrice
    };
    editTrip(trip);
}
  
  
  
  function getTrips() {
        $.get('api/trips', function (trips) {
//            displayTrips(trips);
            tripDataTable.ajax.reload();
                    console.log(trips);
        });
    }




