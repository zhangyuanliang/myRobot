$(function(){
	var APIKEY = 'c34f1de5cad943f4a0e9b8c129e69de7';
	send_welcome();
	//jquery插件滚动条
	$(".central-left").mCustomScrollbar();

	$('.talk_send').on('click', function(){
		//发送消息 
		var message = $('input[name="message"]').val();
		if (!message) return false;
		var ask_data = {message: message};
		ask_data.time = (new Date()).pattern("yyyy-MM-dd HH:mm:ss");
		var html = juicer($('#me_tpl').html(), ask_data);
		$('.central-left .mCSB_container').append(html);
		$('input[name="message"]').val('');
		//更新滚动条
		updateScrollbar('.central-left');
		//返回答案
		data = {
    		'key': APIKEY,
    		'info': message,
    		'userid': '123456'
    	};
		$.ajax({
			type: "POST",
			data: data,
			url: "http://www.tuling123.com/openapi/api",
			async: false,
			dataType: "json",
			success: function(result){
				var answer_data = {message: result.text};
				answer_data.time = (new Date()).pattern("yyyy-MM-dd HH:mm:ss");
				var html = juicer($('#robot_tpl').html(), answer_data);
				$('.central-left .mCSB_container').append(html);
				//更新滚动条
				updateScrollbar('.central-left');
			}
		});

	})
	$("body").keydown(function() {
		if (event.keyCode == "13") {//keyCode=13是回车键
			$('.talk_send').trigger('click');
		}
	});

	function send_welcome(){
		var data = {message: '您好，欢迎使用智能问答系统！'};
		data.time = (new Date()).pattern("yyyy-MM-dd HH:mm:ss");
		var html = juicer($('#robot_tpl').html(), data);
		$('.central-left').append(html);
	}
	function updateScrollbar(selector){
		var customScrollbar=$(selector).find(".mCSB_scrollTools");
		customScrollbar.css({"opacity":0});
		$(selector).mCustomScrollbar("update");
		customScrollbar.animate({opacity:1},"slow");
		$(selector).mCustomScrollbar("scrollTo","bottom",{
		    scrollInertia:1500
		});
	}
})