export default function() {

  $("#consulting-form").submit((event) => {
    event.preventDefault();

    const email = $("#consulting-form input[name=email]").val();
    const text = $("#consulting-form textarea[name=text]").val();
    $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/880865/f9xpjq/",
      method: "POST",
      data: {
        email, text,
        title: document.title,
        location: JSON.parse(JSON.stringify(document.location))
      },
      success: function() {
        $("#consulting-form").addClass("status-success");
        $("#consulting-form .status").append(
          `<p>✅ message sent</p>`);
        logEvent("CONSULTING_FORM_SENT", { email, text });
      }
    });

  });

}
