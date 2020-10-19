{
    var ajax=function f(){
      
        $('#postForm').submit(function(e){
            e.preventDefault();
        
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:$('#postForm').serialize(),
                success:function(xhrdata){
                 $('#posts-list').prepend(postDom(xhrdata.data.POST));
                },error:function(error){
                 console.log(error);
                 return;
                }
            });
        
        });
    }

    let postDom=function(post){
        return $(` 
                  <li>    
                         <a href="/posts/delete/?id=${post.id}"> X </a>
                                name : <small> ${post.usr.username} </small> <br>
                                post : ${post.content} <br> <br>
                        <ul id="comments-list">      
                        </ul>
                 </li>
           <br>
                <div id='create-comment'>
                <form action='/comments/create' method="POST">
                    <input name="content" placeholder="comment here...">
                    <input type='hidden' name='postid' value='${post._id}'>
                    <input type="submit" value="comment">
                </form>
                </div>`);
    }

    ajax();
    
     
}