

/**
 * function clones js object and returns copied one
 * @param obj
 * @returns {*}
 */
var cloneObject = function(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObject(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
        }
        return copy;
    }
};
/**
 * function clones first object and 
 * then fulfills all props from second object to cloned one
 */
var concatConfigs = function (objectToFill, objectToJoin) {
	var result = cloneObject(objectToFill);

	for (var key in objectToJoin) {
		if (!objectToJoin.hasOwnProperty(key)) continue;

		result[key] = objectToJoin[key];
	}
	return result;
};

module.exports.configurate = function () {

	var commonConfig = {
		'server' : {
			'port' : 3000
		}
	};

	var config = {
		'dev' : {
			'server' : {
				'port' : 3000
			},
			'env' : 'development'
		},
		'prod' : {
			'server' : {
				'port' : 80
			},
			'env' : 'production'
		}
	};

	var builtConfig = commonConfig;
	
	if (config.hasOwnProperty(process.argv[2])) {
		return concatConfigs(builtConfig, config[process.argv[2]]);
	}
	else {
		return concatConfigs(builtConfig, config["dev"]);
	}
};