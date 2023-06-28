$(document).ready(function() {
    // Mengambil daftar item saat halaman dimuat
    fetchItems();
    
    // Menambahkan item
    $('#add-form').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        url: 'add_item.php',
        type: 'POST',
        data: formData,
        success: function(response) {
          alert(response);
          fetchItems(); // Mengambil daftar item terbaru setelah menambahkan item
          $('#add-form')[0].reset();
        }
      });
    });
    
    // Menghapus item
    $(document).on('click', '.delete-btn', function() {
      var itemId = $(this).data('id');
      if (confirm('Anda yakin ingin menghapus item ini?')) {
        $.ajax({
          url: 'delete_item.php',
          type: 'POST',
          data: {id: itemId},
          success: function(response) {
            alert(response);
            fetchItems(); // Mengambil daftar item terbaru setelah menghapus item
          }
        });
      }
    });
    
    // Memuat item saat mengklik tombol edit
    $(document).on('click', '.edit-btn', function() {
      var itemId = $(this).data('id');
      $.ajax({
        url: 'get_item.php',
        type: 'POST',
        data: {id: itemId},
        dataType: 'json',
        success: function(response) {
          $('#edit-id').val(response.id);
          $('#edit-type').val(response.type);
          $('#edit-title').val(response.title);
          $('#edit-author').val(response.author);
          $('#edit-year').val(response.year);
          $('#edit-publisher').val(response.publisher);
        }
      });
    });
    
    // Mengupdate item
    $('#edit-form').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        url: 'update_item.php',
        type: 'POST',
        data: formData,
        success: function(response) {
          alert(response);
          fetchItems(); // Mengambil daftar item terbaru setelah mengupdate item
          cancelEdit();
        }
      });
    });
  });
  
  // Mendapatkan daftar item dari server
  function fetchItems() {
    $.ajax({
      url: 'get_items.php',
      type: 'GET',
      success: function(response) {
        $('#item-table tbody').html(response); // Memperbarui konten dari tbody dengan daftar item yang diperoleh dari server
      }
    });
  }
  
  // Membatalkan mode edit
  function cancelEdit() {
    $('#edit-form')[0].reset();
    $('#edit-id').val('');
  }
  