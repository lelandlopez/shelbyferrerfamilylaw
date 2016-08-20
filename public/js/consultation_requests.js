var myViewModel = new Vue({
	el: '#my_view',
	ready: function() {
		this.fetchMessages();
	},
	methods: {
		fetchMessages: function () {
			this.$http.get('/api/qwerqwer').then((response) => {
				this.$set('messages', response.json())
		        // success callback
		    }, (response) => {
		        // error callback
		    });
		}
	}
});