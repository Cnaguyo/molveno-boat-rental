var trip_id;
var tripDataTable;

$(document).ready(function() {
  // defining a datatable table -- should be one time
  tripDataTable = $('#tripTable').DataTable({
    ajax: {
      url: 'api/trips',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'duration' },
      { data: 'start_time'},
      { data: 'end_time'},
      { data: 'numOfPersons'},
      { data: 'totalIncome'},
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><i class="fas fa-close" triptid="' + data.id + '"></i></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <i class="fas fa-edit" tripid="' + data.id + '"></i></a></td>';
        }
      }
    ]
  });

  // add an event on the add boat button
  $('#createTripButton').click(function(e) {
//    if ($('#tripDurationInput').val() === '') i'm not sure
    {
      alert('No trip duration is set');
    }
    else
    {
      addTrip();
    }
    e.preventDefault();
  });

  // add an event on fetch trips button
  $('#fetch').click(function(e) {
    getTrips();
    e.preventDefault();
  });
  $('#checkbtn').click(function(){
    //get suitable boats
  })

  // an event when we click on the delete icon
  $('#tripTable').on('click', '.fas.fa-close', function(e) {
    trip_id = $(this).attr('tripid');
    $('#confirm').show();
    e.preventDefault();
  });
//create a function for get boat
function getBoats() {
    $.get('api/boats', function(boats){
        displayBoats(boats);
    });
}

function getBoats() {
    $.get('api/boats', function(boats){
        displayBoats(boats);
    });
}
  // an event when we click on the edit icon
  $('#tripTable').on('click', '.fas.fa-edit', function() {
    trip_id = $(this).attr('tripid');
    const trip_duration = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    const trip_start_time = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
    const trip_end_time= event.target.parentNode.parentElement.parentElement.children[3].innerHTML;
    const trip_numOfPersons= event.target.parentNode.parentElement.parentElement.children[4].innerHTML;
    const trip_totalIncome= event.target.parentNode.parentElement.parentElement.children[5].innerHTML;
    $('#tripEditDuration').val(trip_duration);
    $('#tripEditStart_time').val(trip_start_time);
    $('#tripEditEnd_time').val(trip_end_time);
    $('#tripEditNumOfPersons').val(trip_numOfPersons);
    $('#tripEditTotalIncome').val(trip_totalIncome);
    $('#updateModal').show();
  });

  // adding an event on the button of close Edit Modal
  $('#closeEditbtn').click(function() {
    $('#updateModal').hide();
  });

  // adding an event on the small button close of update modal
  $('.closeEdit').click(function() {
    $('#updateModal').hide();
  });

  // add an event on the update button of the update Modal
  $('#update').click(function() {
    updateTrips(trip_id);
    $('#updateModal').hide();
  });

  // add an event on the yes button of the alert delete Modal
  $('#yesBtn').click(function() {
    deleteTrips(trip_id);
    $('#confirm').hide();
  });
  // adding an event on the small button close of confirm delete alert modal
  $('.close').click(function() {
    $('#confirm').hide();
  });
  // adding an event on the close button of confirm delete modal
  $('#delete').click(function() {
    $('#confirm').hide();
  });
});

// Add trip function
function addTrip() {
  var trip  = {
    trip_duration: $('#durationInput').val(),
    start_time: Number($('#start_timeInput').val()),
    end_time: Number($('#end_timeInput').val()),
    numOfPersons: Number($('#numOfPersonsInput').val()),
    totalIncome: Number($('#atotalIncomeInput').val()),

  };
  var jsonObject = JSON.stringify(trip);
  $.ajax({
    url: 'api/trips',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A trip has been Added!', 'success');
      getTrips();
    },
    error: function() {
     // showAlert('');
      alert('Invalid Input');
    }
  });
}

// get trip function
function getTrips() {
  boatDataTable.ajax.reload();
}

// update trip function
function updateTrips(trip_id) {
  var boat = {
    id: trip_id,
    duration: $('#tripEditDuration').val(),
    start_time: Number($('#tripEditStart_time').val()),
    end_time: Number($('#tripEditEnd_time').val()),
    numOfPersons: Number($('#tripEditNumOfPersons').val()),
    totalIncome: Number($('#tripEditTotalIncome').val())

  };

  var jsonObject = JSON.stringify(trip);
  $.ajax({
    url: 'api/trips/' + trip_id,
    type: 'PUT',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      alert('There has been an update!', 'success');
      getTrips();
    },
    error: function() {
      alert('Invalid Input', 'error');
    }
  });
}

// delete trip function
function deleteTrips(trip_id) {
  $.ajax({
    url: 'api/trips/' + trip_id,
    type: 'DELETE',
    success: function() {
     alert('A trip has  been deleted!');
      getTrips();
    },
    error: function() {
      alert('Invalid input!');
    }
  });
}

// show alert function
function showAlert(msg, myclass) {
  if (myclass === 'error') {
    $('.modal-title').html('');
    $('.modal-title').html('Error');
    $('#error').show();
    $('#message').text('');
    $('#message').append(msg);
  } else {
    $('.modal-title').html('');
    $('.modal-title').html('Success');
    $('#error').show();
    $('#message').text('');
    $('#message').append(msg);
  }
}