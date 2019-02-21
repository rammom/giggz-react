import axios from 'axios';

class Auth {

	async login(body, success, fail) {
		console.log("logging in...");
		await axios.post('/auth/login', body)
			.then(res => {
				this.authenticated = true;
				sessionStorage.setItem('user', JSON.stringify(res.data.user));
				window.location.replace('/');
				return success ? success(res) : null;
			})
			.catch(err => fail ? fail(err) : null);
	}

	async logout(success, fail) {
		console.log("logging out...");
		await axios.get('/auth/logout')
			.then(res => {
				this.authenticated = false;
				sessionStorage.setItem('user', null);
				window.location.replace('/');
				return success ? success(res) : null;
			})
			.catch(err => fail ? fail(err) : null);
	}

	getCachedUser() {
		let user = JSON.parse(sessionStorage.getItem('user'));
		if (!user) return {};
		user.firstname = user.firstname.substring(0,1) + user.firstname.substring(1).toLowerCase();
		user.lastname = user.lastname.substring(0, 1) + user.lastname.substring(1).toLowerCase();
		user.email = user.email.toLowerCase();
		return user;
	}


	isAuthenticated() { 
		return sessionStorage.getItem('user') !== "null"; 
	}
}

export default new Auth();