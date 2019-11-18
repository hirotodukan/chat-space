$(function(){
  function buildMessage(message){
    if (message.content && message.image.url) {
      var html = `<div class="contents__main__messages__data" data-message-id=${message.id}>
                    <div class="contents__main__messages__data__info">
                      <div class="contents__main__messages__data__info__talker">
                        ${message.user_name}
                      </div>
                      <div class="contents__main__messages__data__info__date">
                        ${message.created_at}
                      </div>
                      </div>
                      <div class="contents__main__messages__data__text">
                        <p class="lower-message__content">
                          ${message.content}
                          
                        </p>
                      </div>
                        <img src=${message.image} >
                  </div>`
      return html;
    } else{
      var html = `<div class="contents__main__messages__data" data-message-id=${message.id}>
                    <div class="contents__main__messages__data__info">
                      <div class="contents__main__messages__data__info__talker">
                        ${message.user_name}
                      </div>
                      <div class="contents__main__messages__data__info__date">
                        ${message.created_at}
                      </div>
                      </div>
                      <div class="contents__main__messages__data__text">
                      <p class="lower-message__content">
                        ${message.content}
                        
                      </p>

                    </div>
                  </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url =$(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".contents__main__messages").append(html)
      $('.contents__main__messages').animate({scrollTop: $('.contents__main__messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled',false);
      $('form')[0].reset()
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
     //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
     last_message_id = $('.contents__main__messages__data:last').data("message-id");
     $.ajax({
       //ルーティングで設定した通りのURLを指定
       url: "api/messages",
       //ルーティングで設定した通りhttpメソッドをgetに指定
       type: 'get',
       dataType: 'json',
       //dataオプションでリクエストに値を含める
       data: {id: last_message_id}
     })
     .done(function(messages) {

       //追加するHTMLの入れ物を作る
       var insertHTML = '';
       messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildMessage(message); //メッセージが入ったHTMLを取得
        $('.contents__main__messages').append(insertHTML);//メッセージを追加
        $('.contents__main__messages').animate({scrollTop: $('.contents__main__messages')[0].scrollHeight}, 'fast');
       })
 
     })
     .fail(function() {
        alert('自動更新に失敗しました');
     });
   };
   setInterval(reloadMessages, 7000);
  
});

