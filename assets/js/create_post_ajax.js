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

                                $(`#id-${xhrdata.data.POST._id}`).click(function(e){
                                    e.preventDefault();
                                    $.ajax({
                                        type:'get',
                                        url:$(`#id-${xhrdata.data.POST._id}`).prop('href'),
                                        success:function(Data){
                                        $(`#${Data.data.id}`).remove();
                                        },error:function(error){
                                        console.log(error);
                                        }
                                    });
                                }); 
                },error:function(error){
                 console.log(error);
                 return;
                }
            });
        
        });
    }

    let postDom=function(post){
        return $(` 
        <div id='${post._id}'>  
                  <li>    
                         <a class="deletePost" id="id-${post._id}" href="/posts/delete/?id=${post._id}"> X </a>
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
               </div>

            </div>`);
    }
   
       let arr= $('.deletePost');

       for(let i=0;i<arr.length;i++){
      
           arr.eq(i).click(function(e){
            e.preventDefault();
    
            $.ajax({
                type:'get',
                url:arr.eq(i).prop('href'),
                success:function(Data){
                  $(`#${Data.data.id}`).remove();
                },error:function(error){
                  console.log(error);
                }
            });
    
        }); 
       }
    

    ajax();
    
     
}