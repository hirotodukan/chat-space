$(function(){
  function buildMessage(message){
    if ( message.image.url ) {
      var html = `<div class="contents__main__messages__data">
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
      var html = `<div class="contents__main__messages__data">
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
    last_message_id = $('.messages:last').data('id');

    var buildMessageHTML = function(message) {
      if (message.content && message.image.url) {
        //data-idが反映されるようにしている
        var html = `<div class="message" data-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image.url + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image.url) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<img src="` + message.image.url + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    };

    $.ajax({
      url: groups/message.id/messages,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      $('.contents__main__messages').animate({scrollTop: $('.contents__main__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  };
});

