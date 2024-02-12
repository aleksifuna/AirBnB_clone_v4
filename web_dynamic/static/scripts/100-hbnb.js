$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};
  $('.amenities input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.id] = this.dataset.name;
    } else {
      delete amenities[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(amenities).sort().join(', '));
  });

  $('#state').change(function () {
    if (this.checked) {
      states[this.dataset.id] = this.dataset.name;
    } else {
      delete states[this.dataset.id];
    }
    $('.locations h4').text([...Object.values(states), ...Object.values(cities)].sort().join(', '));
  });

  $('#city').change(function () {
    if (this.checked) {
      cities[this.dataset.id] = this.dataset.name;
    } else {
      delete cities[this.dataset.id];
    }
    $('.locations h4').text([...Object.values(states), ...Object.values(cities)].sort().join(', '));
  });

  // toggle class based on api status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function handlePlacesData (data) {
    $('section.places').empty();
    data.forEach((place) => {
      const articleHtml = `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">${place.description}</div>
      </article>`;
      $('section.places').append(articleHtml);
    });
  }

  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: handlePlacesData
  });

  $('button[type=button]').click(() => {
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        cities: Object.keys(cities),
        states: Object.keys(states)
      }),
      headers: { 'Content-Type': 'application/json' },
      success: handlePlacesData
    });
  });
});
