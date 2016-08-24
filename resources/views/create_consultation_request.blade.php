<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta id="token" name="token" value="{{csrf_token()}}">
	<title>Consultation Requests</title>
	<link rel="stylesheet" type="text/css" href="/css/app.css">
	<style>
		body { padding:2em 0; }
		.error { bold; color:red; }
		.con_left {
			width: 75%;
		    height: 200px;
		    background: red;
		    float: left;
		}
		.ar {
		}
	</style>
</head>
<body>
	<div class="container">
		<div id="my_view">
			<form method="POST" v-on:submit.prevent="onSubmit">
				<div v-if="!submitted">
					<div class="form-group">
						<label for="email">
							Email:
							<span class="error" v-if="! newConsultationRequest.email">*</span>
						</label>
						<input type="text" name="email" id="email" class="form-control" v-model="newConsultationRequest.email">
					</div>
					<div class="form-group">
						<label for="message">
							Message:
							<span class="error" v-if="! newConsultationRequest.message">*</span>
						</label>
						<textarea type="text" name="message" id="message" class="form-control" v-model="newConsultationRequest.message">
						</textarea>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-default" :disabled="errors" v-if="! submitted">Register</button>
					</div>
				</div>
				<div class="alert alert-success" v-if="submitted">Thank You!  We will respond to this message as soon as we can</div>
			</form>
			<hr>
			<ul class="list-group">
				<li class="list-group-item" v-for="message in messages">
					<div class="row">
		                <div class="col-md-8">
							<h3>@{{ message.email }}</h3>
		                </div>
		                <div class="col-md-4" style="bottom: 0;">
							<button v-on:click="delete(message.id, $index)" type="button" class="pull-right btn btn-default" id="@{{message.id}}">Delete</button>
						</div>
		            </div>
					<div class="row">
		                <div class="col-md-8" style="">
							<div class="body">@{{message.message}}</div>
		                </div>
		            </div>
				</li> 
			</ul>
		</div>
	</div>
	<script src="/js/all.js"> </script>
	<script src="/js/create_consultation_requests.js"></script>
</body>
</html>
