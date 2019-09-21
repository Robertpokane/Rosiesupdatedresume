function userInformationHTML(user) {
        return `
        <h2>${user.name}
            <span class = "small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                </a>
            </div>
            <p> Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div> `;
}

function fetchGitHubInformation (event) {

    var username = $("#gh-username").val();
    if(!username) {
        $("#gh-user-data").html(`<h2>Please Enter A GitHub User Name</h2>`);
        return;
} // working

$("#gh-user-data").html(
    `<div id="loader">
    <image src="assets/css/loader.gif" alt="loading..." />
    </div>`); // working

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
        ).then(
            function(response) {
                var userData = response;
                $("#gh-user-data").html(userInformationHTML(userData));
            }, function(errorResopnse) {
                if (errorResponse.status === 404 ) {
                    $("#gh-user-data").html(
                        `<h2>No Info Found For user ${username}</h2>`);
                } else {
                    consoleog(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error:${errorResponse.responseJSON.message}</h2>`);
                }
            });
}