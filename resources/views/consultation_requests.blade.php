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
		.noresize {resize:none;}

		* {
			box-sizing: border-box;
		}

		.modal-mask {
			position: fixed;
			z-index: 9998;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .5);
			transition: opacity .3s ease;
		}

		.modal-container {
			width: 70%;
			margin: 40px auto 0;
			padding: 20px 30px;
			background-color: #fff;
			border-radius: 2px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
			transition: all .3s ease;
		}

		.modal-header h3 {
			margin-top: 0;
			color: #42b983;
		}

		.modal-body {
			margin: 20px 0;
		}

		.text-right {
			text-align: right;
		}

		.form-label {
			display: block;
			margin-bottom: 1em;
		}

		.form-label > .form-control {
			margin-top: 0.5em;
		}

		.modal-enter, .modal-leave {
			opacity: 0;
		}

		.modal-enter .modal-container,
		.modal-leave .modal-container {
			-webkit-transform: scale(1.1);
			transform: scale(1.1);
		}
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
			<ul class="list-group lgp">
				<li class="list-group-item active"> Filters </li>
				<li class="list-group-item">
					<div class="checkbox">
						<label><input type="checkbox" value="">Unread</label>
					</div>
				</li>
			</ul>
			<ul class="list-group lgp" v-for="item in items">
				<li class="list-group-item" v-for="message in item">
					<div class="row">
						<div class="col-md-12" id="">
							<p>@{{this.getHeader(message.payload.headers, 'From')}}</p>
							<p>@{{this.getHeader(message.payload.headers, 'Date')}}</p>
							<p>@{{message.snippet}}</p>
						</div>
					</div>
				</li> 
				<li class="list-group-item" >
					<modal :show.sync="showModal" :index=item></modal>
				    <button class="btn btn-primary btn-sm" id="show-modal" @click="showModal = true">Reply</button>
				</li>
			</ul>
		</div>

		<script src="/js/all.js"> </script>
		<script src="/js/consultation_requests.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=checkAuth"> </script>
		<!-- template for the modal component -->
		<script type="x/template" id="modal-template">
			<div class="modal-mask" v-show="show" @click="close" transition="modal">
				<div class="modal-container" @click.stop>

					<div class="modal-header">
						<h3>Reply</h3>
					</div>

					<div class="modal-body">
						<label class="form-label">
							Body
							<textarea rows="5" v-model="body" class="form-control" style="resize:none"></textarea>
						</label>
					</div>

					<div class="modal-footer text-right">
						<button class="modal-default-button btn btn-primary" @click="savePost()">
						Send
						</button>
					</div>
				</div>
			</div>
		</script>
	</div>

</body>
</html>
