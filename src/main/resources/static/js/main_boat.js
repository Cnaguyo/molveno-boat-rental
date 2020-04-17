var boat_id;
var boatDataTable;

$(document).ready(function() {
  // defining a datatable table -- should be one time
  boatDataTable = $('#boatTable').DataTable({
    ajax: {
      url: 'api/boats',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'boatType' },
      { data: 'maxSeats'},
      { data: 'boatNumber'},
      { data: 'minimumPrice'},
      { data: 'actualPrice'},
      { data: 'isAvailable'},
      {
        data: null,
        render: function(data, type, row) {
          return '<td><button class="btn btn-primary" boatid="' + data.id + '"></button></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <i class="fas fa-edit" boatid="' + data.id + '"></i></a></td>';
        }
      }
    ]
  });

  // add an event on the add boat button
  $('#createBoatButton').click(function(e) {
        getBoats();
//    if ($('#boatTypeInput').val() === '') i'm not sure
//    {
      alert('No boatType set');
//    }
//    else
//    {
      addBoat();
    });
//    e.preventDefault();
//  });

function getBoats() {
    $.get('api/boats', function(boats){
//        displayBoats(boats);
        console.log(boats);
    });
  // add an event on fetch boats button
  $('#fetch').click(function(e) {
    getBoats();
    e.preventDefault();
  });

  // an event when we click on the delete icon
  $('#boatTable').on('click', '.fas.fa-close', function(e) {
    boat_id = $(this).attr('boatid');
    $('#confirm').show();
    e.preventDefault();
  });

  // an event when we click on the edit icon
  $('#boatTable').on('click', '.fas.fa-edit', function() {
    boat_id = $(this).attr('boatid');
    const boat_boatType = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    const boat_maxSeats = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
    const boat_boatNumber= event.target.parentNode.parentElement.parentElement.children[3].innerHTML;
    const boat_minimumPrice= event.target.parentNode.parentElement.parentElement.children[4].innerHTML;
    const boat_actualPrice= event.target.parentNode.parentElement.parentElement.children[5].innerHTML;
    const boat_isAvailable= event.target.parentNode.parentElement.parentElement.children[6].innerHTML;
    $('#boatEditBoatType').val(boat_boatType);
    $('#boatEditMaxSeats').val(boat_maxSeats);
    $('#boatEditBoatNumber').val(boat_boatNumber);
    $('#boatEditMinimumPrice').val(boat_minimumPrice);
    $('#boatEditActualPrice').val(boat_actualPrice);
    $('#boatEditIsAvailable').val(boat_isAvailable);
    $('#updateModal').show();
  });

  // adding an event on the button of close Edit Modal
  $('#closeEditbtn').click(function() {
    $('#updateModal').hide();
  });
  }

  function displayBoats(boats) {
       $('#boatHeadContainer').empty();
       $('#boatBodyContainer').empty();

       $('#boatHeadContainer').html("<b>Boats Table</b>");
       $('#boatHeadContainer').append('<tr><th>Id</th><th>boatType</th><th>Actions</th></tr>');
       $.each(boats, function(index, boat) {
          $('#boatBodyContainer').append('<tr><td>' + boat.id + '</td><td>' +  boat.boatType +
              '</td><td><button class = "remove-button" boatId = " ' + boat.id + ' " >Delete </button></td></tr>');
       });
       $("#boatBodyContainer .remove-button").click(removeBoat);
  }


  // adding an event on the small button close of update modal
  $('.closeEdit').click(function() {
    $('#updateModal').hide();
  });

  // add an event on the update button of the update Modal
  $('#update').click(function() {
    updateBoats(boat_id);
    $('#updateModal').hide();
  });

  // add an event on the yes button of the alert delete Modal
  $('#yesBtn').click(function() {
    deleteBoats(boat_id);
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

// Add boat function
function addBoat() {
  var boat  = {
    boat_boatType: $('#boatTypeInput').val(),
    maxSeats: Number($('#maxSeatsInput').val()),
    boatNumber: Number($('#boatNumberInput').val()),
    minimumPrice: Number($('#minimumPriceInput').val()),
    actualPrice: Number($('#actualPriceInput').val()),
//    isAvailable: $('#isAvailable').val()
  };
  var jsonObject = JSON.stringify(boat);
  $.ajax({
    url: 'api/boats',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A boat has been Added!', 'success');
      getBoats();
    },
    error: function() {
     // showAlert('');
      alert('Invalid Input');
    }
  });
}



// update boat function
function updateBoats(boat_id) {
  var boat = {
    id: boat_id,
    boatType: $('#boatEditBoatType').val(),
    maxSeats: Number($('#boatEditMaxSeats').val()),
    boatNumber: Number($('#boatEditBoatNumber').val()),
    minimumPrice: Number($('#boatEditMinimumPrice').val()),
    actualPrice: Number($('#boatEditActualPrice').val()),
    isAvailable: $('#boatEditIsAvaliabile').val()

  };

  var jsonObject = JSON.stringify(boat);
  $.ajax({
    url: 'api/boats/' + boat_id,
    type: 'PUT',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      alert('A record is updated!', 'success');
      getBoats();
    },
    error: function() {
      alert('Invalid Input', 'error');
    }
  });
}

// delete boat function
function deleteBoats(boat_id) {
  $.ajax({
    url: 'api/boats/' + boat_id,
    type: 'DELETE',
    success: function() {
     alert('A boat has  been deleted!');
      getBoats();
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