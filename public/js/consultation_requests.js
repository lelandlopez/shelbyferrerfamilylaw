Vue.component('modal', {

	template: '#modal-template',
	props: ['show', 'index'],
	data: function () {
		return {
			title: '',
			body: ''
		};
	},
	methods: {
		sendMessage: function(headers_obj, message, threadId) {
			var email = '';

			for(var header in headers_obj)
				email += header += ": "+headers_obj[header]+"\r\n";

			email += "\r\n" + message;

			var sendRequest = gapi.client.gmail.users.messages.send({
				'userId': 'me',
				'resource': {
					'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_'),
					'threadId': threadId
				}
			});
			return sendRequest.execute(function(response) {
				console.log(response);
			});
		},
		getHeader: function(headers, index) {
			for (i = 0; i < headers.length; i++) { 
				if(headers[i].name == index) {
					return headers[i].value;
				}
			}		
		},
		savePost: function () {
			this.show = false;
			console.log(this.index);
			var from = this.getHeader(this.index[this.index.length-1].payload.headers, 'From');
			var subject = this.getHeader(this.index[this.index.length-1].payload.headers, 'Subject');
			var to = this.getHeader(this.index[this.index.length-1].payload.headers, 'To');
			var references = this.getHeader(this.index[this.index.length-1].payload.headers, 'References');
			var replyTo = this.getHeader(this.index[this.index.length-1].payload.headers, 'Reply-To');
			var threadId = this.index[this.index.length-1].threadId;
			this.sendMessage(
			{
				'To': to,
				'Subject': subject,
				'From': from,
				'References': references,
				'In-Reply-To': replyTo,
			}, this.body,
			threadId
			);
		},
		close: function () {
			this.show = false;
			this.body = '';
		},
	},
	ready: function () {
		document.addEventListener("keydown", (e) => {
			if (this.show && e.keyCode == 27) {
				this.close();
			}
		});
	}
});

var myViewModel = new Vue({
	data: {
		message: [
		],
		showModal: false,
		items: [
		],
		qwer: [
		],
		CLIENT_ID: '868665435885-91cm46n65170h0v4p5t4il7nfnuatmkk.apps.googleusercontent.com',
		SCOPES: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
		signed_in: false,
		thread: [
		],
		thread_id: 0,
		global_messages: [
		]
	},	
	computed: {
	},

	el: '#my_view',
	ready: function() {
		console.log(this.items);
	},
	methods: {
		sendMessage: function(headers_obj, message, threadId) {
			var email = '';

			for(var header in headers_obj)
				email += header += ": "+headers_obj[header]+"\r\n";

			email += "\r\n" + message;

			var sendRequest = gapi.client.gmail.users.messages.send({
				'userId': 'me',
				'resource': {
					'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_'),
					'threadId': threadId
				}
			});
			return sendRequest.execute(function(response) {
				console.log(response);
			});
		},
		respond: function (item) {
			var from = this.getHeader(item[item.length-1].payload.headers, 'From');
			var subject = this.getHeader(item[item.length-1].payload.headers, 'Subject');
			var to = this.getHeader(item[item.length-1].payload.headers, 'To');
			var references = this.getHeader(item[item.length-1].payload.headers, 'References');
			var replyTo = this.getHeader(item[item.length-1].payload.headers, 'Reply-To');
			var threadId = item[item.length-1].threadId;
			this.sendMessage(
			{
				'To': to,
				'Subject': subject,
				'From': from,
				'References': references,
				'In-Reply-To': replyTo,
			}, "consultation",
			threadId
			);
		},
		flagEmail: function (email) {

		},
		signOut: function() {
			console.log("got in here")
			gapi.auth.signOut();
		},

		checkAuth: function() {
			gapi.auth.authorize(
			{
				'client_id': this.CLIENT_ID,
				'scope': this.SCOPES.join(' '),
				'immediate': true
			}, this.handleAuthResult);
		},

		handleAuthResult: function(authResult) {
			var authorizeDiv = document.getElementById('authorize-div');
			if (authResult && !authResult.error) {
				// Hide auth UI, then load client library.
				authorizeDiv.style.display = 'none';
				this.loadGmailApi();
				this.signed_in = true;
			} else {
				// Show auth UI, allowing the user to initiate authorization by
				// clicking authorize button.
				authorizeDiv.style.display = 'inline';
			}
		},
		handleAuthClick: function(event) {
			gapi.auth.authorize(
				{client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false},
				this.handleAuthResult);
			return false;
		},

		loadGmailApi: function() {
			gapi.client.load('gmail', 'v1', this.displayThreads);
		},

		displayThreads: function() {
			var request = gapi.client.gmail.users.threads.list({
				'userId': 'me',
				'q' : '("consultation" OR "request") label:unread from:lelandlopez@gmail.com'
			});
			request.execute(this.getThreadIds);
		},
		getThreadIds: function(response) {
			var threads = response.threads;
			if(threads && threads.length > 0) {
				for(i = 0; i < threads.length; i++ ) {
					var request = gapi.client.gmail.users.threads.get({
						'userId': 'me',
						'id': threads[i].id
					});
					request.execute(this.getThread);
				}
			}
		},
		getThread: function(response) {
			this.items.push(response.messages);
			console.log(response.messages[0].payload.headers);
		},
		displayInbox: function() {
			var request = gapi.client.gmail.users.messages.list({
				'userId': 'me',
				'labelIds': 'INBOX',
				'maxResults': 10,
				'q' : '("consultation" OR "request") label:unread from:lelandlopez@gmail.com'
			});

			request.execute(this.get_email_ids);
		},

		get_email_ids: function(response) {
			var messages = response.messages;
			if(messages && messages.length > 0) {
				for(i = 0; i< messages.length; i++ ) {
					var request = gapi.client.gmail.users.messages.get({
						'userId': 'me',
						'id': messages[i].id
					});
					request.execute(this.get_emails);
				}
			}
			console.log(this.items);
		},
		get_emails: function(response) {
			console.log(response.payload.headers);
			var subject = this.getHeader(response.payload.headers, 'Subject').replace(/\"/g, '&quot;');
			var from = this.getHeader(response.payload.headers, 'From');
			var date = this.getHeader(response.payload.headers, 'Date');
			var replyTo = this.getHeader(response.payload.headers, 'Reply-To');
			var references = this.getHeader(response.payload.headers, 'References');
			var message_ID = this.getHeader(response.payload.headers, 'Message-ID');
			var threadId = response.threadId;
			var snippet = response.snippet;
			console.log(threadId);
			var body = this.getBody(response.payload);
			var id = response.id;
			var email = {id: id, snippet: snippet, message_ID: message_ID, references: references, replyTo: replyTo, threadId: threadId, subject: subject, from: from, date: date, body: body}
			this.items.push(email);
		},
		getHeader: function(headers, index) {
			for (i = 0; i < headers.length; i++) { 
				if(headers[i].name == index) {
					return headers[i].value;
				}
			}		
		},
		getBody: function(message) {
			var encodedBody = '';
			if(typeof message.parts === 'undefined')
			{
				encodedBody = message.body.data;
			}
			else
			{
				encodedBody = this.getHTMLPart(message.parts);
			}
			encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
			return decodeURIComponent(escape(window.atob(encodedBody)));
		},
		getHTMLPart: function(arr) {
			for(var x = 0; x <= arr.length; x++)
			{
				if(typeof arr[x].parts === 'undefined')
				{
					if(arr[x].mimeType === 'text/html')
					{
						return arr[x].body.data;
					}
				}
				else
				{
					return getHTMLPart(arr[x].parts);
				}
			}
			return '';
		},
		listThreads: function(userId, query, callback) {
			var getPageOfThreads = function(request, result) {
				request.execute(function (resp) {
					result = result.concat(resp.threads);
					var nextPageToken = resp.nextPageToken;
					if (nextPageToken) {
						request = gapi.client.gmail.users.threads.list({
							'userId': userId,
							'q': query,
							'pageToken': nextPageToken
						});
						getPageOfThreads(request, result);
					} else {
						callback(result);
					}
				});
			};
			var request = gapi.client.gmail.users.threads.list({
				'userId': userId,
				'q': query
			});
			getPageOfThreads(request, []);
		},
		blah: function() {
			console.log('asdf');
		},
		openReplyModal: function(message) {
			showModal = true;
		}

	}
});

function checkAuth() {
	myViewModel.checkAuth();
}

function handleAuthClick(event) {
	myViewModel.handleAuthClick(event);
}