// url = https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=https://developers.google.com/speed/pagespeed/insights/&strategy=mobile&key=AIzaSyBCCOfu44WceqGo1JeREqBp5ymxtceBzSs	

function validateUrl(str)
	{
		// swal(str);
		if(str=='')
		{
			swal('Please enter a URL');
			$('#loaderDiv').addClass('toLoad');
		}else{

			var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
			if (!re.test(str)) { 
				swal("url error");
				return false;
			}else{
				//  check if http is present
				str = checkHttp(str);

				executeURLParams(str);
				}

			}

	}

function checkHttp(url) {
	if (!/^(f|ht)tps?:\/\//i.test(url)) {
		url = "http://" + url;
	}
	return url;
}

function executeURLParams(str)
{
	var urlToFetch = "https://www.googleapis.com/pagespeedonline/v2/runPagespeed";
	// console.log(urlToFetch);
	var renderType = "";
	var selected = $("input[type='radio'][name='render']:checked");
	if (selected.length > 0) {
		renderType = selected.val();
	}
	// console.log(renderType)
	$.ajax({
		url:urlToFetch,
		method:'get',
		dataType:'json',
		data:'url='+str+'/&strategy='+renderType+'&key=AIzaSyBCCOfu44WceqGo1JeREqBp5ymxtceBzSs',
		beforeSend: function(){
			document.getElementById('searchUrlText').disabled = true;
			//$('#loaderDiv').addClass('toLoad');
			$('#resultDiv').addClass('toLoad')
		},
		success: function(ret){
			document.getElementById('searchUrlText').disabled = false;
			$('#loaderDiv').addClass('toLoad');
			var score = ret.ruleGroups.SPEED.score
			if(score >= 80) $('#speedStat').addClass('good');
			if(score <80 && score >60) $('#speedStat').addClass('average');
			if(score <= 60) $('#speedStat').addClass('bad');
			$('score').html(score);
			$('#resultDiv').removeClass('toLoad');
			console.log(ret);
		},
		error: function(){
			document.getElementById('searchUrlText').disabled = false;
			$('#loaderDiv').addClass('toLoad');
			swal('DNS error while resolving the given URL');
		}
	});

}


$(function(){
	$('#speedForm').on('submit',function(evt){
		$('#loaderDiv').removeClass('toLoad');
		evt.preventDefault();
		validateUrl($('.testUrlEle').val());
	})
})
