function myFunction() {
var name = document.getElementById("name").value;
var message = document.getElementById("message").value;

// Returns successful data submission message when the entered information is stored in database.
var dataString = 'name1=' + name + '&email1=' + email + '&password1=' + password + '&contact1=' + contact;
if (name == '' || message== '') {
alert("Please Fill All Fields");
} else {
// AJAX code to submit form.
$.ajax({
type: "POST",
url: "ajax.php",
data: dataString,
cache: false,
success: function(html) {
alert(html);
}
});
}
return false;
}