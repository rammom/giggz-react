class Utils {

	weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	minutes_to_time = (minutes) => {
		return {
			hours: Math.floor(minutes/60),
			minutes: minutes%60,
		}
	}

	daysBetween(first, second) {
		first = new Date(first);
		second = new Date(second);

		// Copy date parts of the timestamps, discarding the time parts.
		var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
		var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

		// Do the math.
		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var millisBetween = two.getTime() - one.getTime();
		var days = millisBetween / millisecondsPerDay;

		// Round down.
		return Math.abs(Math.floor(days));
	}

	arraysEqual(first, second) {
		//if (typeof first !== 'array' || typeof second !== 'array') return false;

		if (first.length !== second.length) return false;
		for (let i = 0; i < first.length; ++i) {
			if (first[i] !== second[i]) return false;
		}
		return true;
	}

	distance(lat1, lon1, lat2, lon2) {
		var p = 0.017453292519943295;    // Math.PI / 180
		var c = Math.cos;
		var a = 0.5 - c((lat2 - lat1) * p)/2 + 
				c(lat1 * p) * c(lat2 * p) * 
				(1 - c((lon2 - lon1) * p))/2;
	  
		return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}
}

export default new Utils();