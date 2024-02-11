$(document).ready(function () {
  const amenities = {};
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.id] = this.dataset.name;
    } else {
      delete amenities[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(amenities).sort().join(', '));
  });

  // toogle class based on api status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
	 if (data.status === 'OK') {
		 $('div#api_status').addClass('available');
	 } else {
		 $('div#api_status').removeClass('available');
	 }
  });
});
