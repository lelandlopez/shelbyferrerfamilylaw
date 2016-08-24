<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta id="token" name="token" value="{{csrf_token()}}">
	<title>Consultation Requests</title>
	<link rel="stylesheet" type="text/css" href="css/app.css">
	<style>
		body {padding: 1.35em;}
		.lgp {padding-top: 1.35em;, padding-bottom:1.35em;}
	</style>
</head>
<body>
	<div id="my_view">
		<div class="container">
			<div v-if="!signed_in" id="logout">
				<button type="button" class="btn btn-default" v-on:click="signOut">Log Out</button>
			</div>
			<div id="authorize-div" style="display: none">
				<span>Authorize access to Gmail API</span>
				<!--Button for the user to click to initiate auth sequence -->
				<button id="authorize-button" onclick="handleAuthClick(event)" class="btn btn-primary">
					Authorize
				</button>
			</div>
			<ul class="list-group lgp" v-for="item in items">
				<li class="list-group-item" v-for="message in item">
					<div class="row">
						<div class="col-md-9" id="">
							<p>@{{this.getHeader(message.payload.headers, 'From')}}</p>
							<p>@{{this.getHeader(message.payload.headers, 'Date')}}</p>
							<p>@{{message.snippet}}</p>
							<p><button class="btn btn-default btn-sm" v-on:click="respond(item)">Respond</button></p>
						</div>
						<div class="col-md-3" id="">
							<a href=""></a>
							<p><button class="btn btn-primary btn-sm">Mark As Read</button></p>
							<p><button class="btn btn-success btn-sm">Add Client Information</button></p>
						</div>
					</div>
				</li> 
			</ul>
		</div>
		<script src="/js/all.js"> </script>
		<script src="/js/consultation_requests.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=checkAuth">
		</script>
	</div>
</body>
</html>
