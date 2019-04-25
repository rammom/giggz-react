import axios from 'axios';

class Auth {
	constructor() {
		// Add a response interceptor
		axios.interceptors.response.use(function (response) {
			// Do something with response data
			return response;
		}, function (error) {
			// Do something with response error
			console.log('error');
			return;// ts.logout();
		});
	}

	async register(body, success, fail) {
		console.log("registering...");
		await axios.post('/auth/register', body)
			.then(res => {
				return success(res);
			})
			.catch(err => {
				return fail(err.response.data);
			})
	}

	async login(body, success, fail) {
		console.log("logging in...");
		await axios.post('/auth/login', body)
			.then(res => {
				this.authenticated = true;
				sessionStorage.setItem('giggz_user', JSON.stringify(res.data.user));
				return success ? success(res) : null;
			})
			.catch(err => fail ? fail(err) : null);
	}

	async logout(success, fail) {
		if (!this.isAuthenticated()) return;
		console.log("logging out...");
		await axios.get('/auth/logout')
			.then(res => {
				this.authenticated = false;
				sessionStorage.setItem('giggz_user', null);
				//window.location.replace('/');
				return success ? success(res) : null;
			})
			.catch(err => {
				sessionStorage.setItem('giggz_user', null);
				//window.location.replace('/');
				return (fail) ? fail(err) : null
			});
	}

	getCachedUser() {
		let user = JSON.parse(sessionStorage.getItem('giggz_user'));
		if (!user) return {};
		user.firstname = user.firstname.substring(0,1) + user.firstname.substring(1).toLowerCase();
		user.lastname = user.lastname.substring(0, 1) + user.lastname.substring(1).toLowerCase();
		user.email = user.email.toLowerCase();
		return user;
	}

	isAuthenticated() {
		return sessionStorage.getItem('giggz_user') !== null && sessionStorage.getItem('giggz_user') !== "null"; 
	}
}

export default new Auth();