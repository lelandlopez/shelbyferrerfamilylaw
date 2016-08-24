Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

var myViewModel = new Vue({
	data: {
		newConsultationRequest: {
			email: '',
			message: ''
		},
		submitted: false
	},
	computed: {
		errors: function() {
			for (var key in this.newConsultationRequest) {
				if( ! this.newConsultationRequest[key]) return true;
			}
		}
	},
	el: '#my_view',
	ready: function() {
		this.fetchMessages();
	},
	methods: {
		fetchMessages: function () {
			this.$http.get('/api/consultation_requests').then((response) => {
				this.$set('messages', response.json())
		        // success callback
		    }, (response) => {
		        // error callback
		    });
		},
		onSubmit: function(e) {
			var consultation_request = this.newConsultationRequest;
			this.messages.push(consultation_request);
			this.newConsultationRequest = {email: '', message: ''};
			this.submitted=true;

			this.$http.post('/api/consultation_requests', consultation_request);
		},
		delete: function(id, index) {
			this.messages.splice(index, 1);
			this.$http.delete('/api/consultation_requests/' + id);
		}
	}
});