export default function() {
  $("#subscribe-form").submit((event) => {
    event.preventDefault();

    const email = $("#subscribe-form input[name=email]").val();
    $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/880865/k082dv/",
      method: "POST",
      data: {
        email: email,
      },
      success: function() {
        $("#subscribe-form").addClass("status-success");
        $("#subscribe-form .status").append(
          `<p>✅<br><br>your ${email.match(/[^@]+$/)[0]} address is subscribed!</p>`);
      }
    });
  });
}