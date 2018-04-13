export default function() {

  $("#discuss-form").submit((event) => {
    event.preventDefault();

    const email = $("#discuss-form input[name=email]").val();
    const text = $("#discuss-form textarea[name=text]").val();
    $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/880865/knfckl/",
      method: "POST",
      data: {
        email, text,
        title: document.title,
        location: JSON.parse(JSON.stringify(document.location))
      },
      success: function() {
        $("#discuss-form").addClass("status-success");
        $("#discuss-form .status").append(
          `<p>✅ message sent</p>`);
        logEvent("COMMENT_SENT", { email, text });
      }
    });

  });

}
