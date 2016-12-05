(function (window, THREE) {
	"use strict";

	window.Planetarium = {
		createPlanet: function () {
			return new Planet();
		}
	};

	function Planet() {
		var self = this;

		self.orbitRadius = 40;
		self.orbitAngle = 0;

		self.increaseAngle = increaseAngle;
		self.sceneAdd = sceneAdd;

		var sphereGeometry = new THREE.SphereGeometry(1, 18, 8);
		var planetMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
		var planet = new THREE.Mesh(sphereGeometry, planetMaterial);

		var initialCoords = polar2cart(this.orbitRadius, this.orbitAngle);
		planet.position.x = initialCoords.x;
		planet.position.y = initialCoords.y;
		planet.receiveShadow = true;
		planet.castShadow = true;

		function increaseAngle(delta) {
			self.orbitAngle += delta;
			var updateCoords = convertPolarToCart(self.orbitRadius, self.orbitAngle);
			planet.position.x = updateCoords.x;
			planet.position.y = updateCoords.y;
		}

		function sceneAdd(scene) {
			scene.add(planet);
		}
	}

	function polar2cart(rad, phi) {
		return {
			x: rad * Math.cos(phi),
			y: rad * Math.sin(phi)
		}
	}

} (window, THREE));