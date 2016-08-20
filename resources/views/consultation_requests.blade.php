<!DOCTYPE html>

<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/app.css">
</head>
<body>
	<div class="container">
		<div id="my_view">
			<ul class="list-group">
				<li class="list-group-item" v-for="message in messages">
					<h3>@{{ message.email }}</h3>
					<div class="body">@{{message.message}}</div>
				</li> 
			</ul>
		</div>
	</div>
	<script src="js/all.js"> </script>
	<script src="js/consultation_requests.js"></script>
</body>
</html>
