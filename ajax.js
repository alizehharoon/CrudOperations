
$(document).ready(function() {
    getAllPosts(); 
});

function getAllPosts() {
    $.ajax({
        url: "//api.sampleapis.com/coffee/hot",
        method: 'GET',
        success: function (data) {
            displayPosts(data);
            var coffee = $("#coffee");
            coffee.empty();
            for (var i = 0; i < data.length; i++) {
                var rec = data[i];
                coffee.append(
                    `<div class="coffees"><h3>${rec.title}</h3></div>`
                );
            }
        }
    });
}

function displayPosts(posts) {
    var postList = $('#post-list');
    postList.empty();
    posts.forEach(function (post) {
        postList.append(`
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}


$('#post-form').submit(function (event) {
    event.preventDefault();
    var title = $('#title').val();
  

    $.ajax({
        url: "//api.sampleapis.com/coffee/hot",
        method: 'POST',
        dataType: 'json',
        data: { title: title },
        success: function () {
            getAllPosts();
            $('#title').val('');
           
        },
        error: function (error) {
            console.log(error);
        }
    });
});



function editPost(id) {
    var newTitle = prompt("Enter the new title:");
    if (newTitle === null || newTitle === "") {
        return; 
    }

   

    $.ajax({
        url: `//api.sampleapis.com/coffee/hot/${id}`,
        method: 'PUT',
        dataType: 'json',
        data: { title: newTitle},
        success: function () {
            
            $("#post-list tr").each(function () {
                if ($(this).find("td:first").text() === id.toString()) {
                    $(this).find("td:nth-child(2)").text(newTitle); 
                  
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        $.ajax({
            url: `//api.sampleapis.com/coffee/hot/${id}`,
            method: 'DELETE',
            success: function () {
                alert(`Post ${id} has been deleted.`);
               
                $("#post-list tr").each(function () {
                    if ($(this).find("td:first").text() === id.toString()) {
                        $(this).remove();
                    }
                });
            },
            error: function (error) {
                console.log(error);
                alert(`Failed to delete post ${id}.`);
            }
        });
    }
}
