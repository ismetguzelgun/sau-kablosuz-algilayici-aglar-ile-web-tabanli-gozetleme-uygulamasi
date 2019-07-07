function sil(event) {

    event.preventDefault();

    
    var confirmation = confirm('Silmek istediğinize emin misiniz ?');

   
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/api/sil/' + $(this).attr('rel')
        }).done(function( response ) {

            
            if (response.msg === '') {
            }
            else {
                alert('Hata: ' + response.msg);
            }

            
            populateTable();

        });

    }
    else {

        
        return false;

    }

};