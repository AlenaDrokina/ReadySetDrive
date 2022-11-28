SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roadtrips;
DROP TABLE IF EXISTS stops;
DROP TABLE IF EXISTS favorite_roadtrips;
DROP TABLE IF EXISTS user;

SET foreign_key_checks = 1;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`image_url` varchar(255) default "",
	`slogan` varchar(255) default "",
	PRIMARY KEY (`id`)
);

CREATE TABLE `roadtrips` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`image_url` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
    `countries` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`done` BOOLEAN NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `stops` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`longitude` DECIMAL(9,5) NOT NULL,
	`latitude` DECIMAL(9,5) NOT NULL,
	`roadtrip_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `favorite_roadtrips` (
	`user_id` INT NOT NULL,
	`roadtrip_id` INT NOT NULL
);

ALTER TABLE `roadtrips` ADD CONSTRAINT `roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `stops` ADD CONSTRAINT `stops_fk0` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`) ON DELETE CASCADE;

ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk1` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`) ON DELETE CASCADE;

-- SAMPLE DATA 

INSERT INTO `users`(username, email, password, image_url, slogan)
    VALUES ("user1", "user1@gmail.com", "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", "https://cdn.mos.cms.futurecdn.net/qNugPZLgH8XQSrXfCb63Dd.jpg", "I like to learn and travel."), ("Harry", "user2@gmail.com", "$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6", "https://www.elindependiente.com/wp-content/uploads/2019/07/IMG_3083.jpg", "I like stealing my friend's flying car to go on a roadtrip.");

INSERT INTO `roadtrips`(image_url, title, countries, description, done, user_id) 
    VALUES ("https://images.unsplash.com/photo-1509840841025-9088ba78a826?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "The best trip of my life", "Spain", "I did a roundtrip in Andalucia...", 1, 1), 
    ("https://images.unsplash.com/photo-1585208798174-6cedd86e019a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnR1Z2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "The scariest trip of my life", "Portugal", "I did a roundtrip from Porto to Lisbon", 1, 1), 
    ("https://images.unsplash.com/photo-1546512970-372b2be5a667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm9ybWFuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The craziest trip of my life", "France", "I did a roundtrip in Normandy", 0, 2), 
    ("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The most romantic trip of my life", "France", "I did a roundtrip from Paris to Marseille", 1, 2),
	("https://images.unsplash.com/photo-1608243027404-bf342660e791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Mosell region in autumn", "Germany", "We visited some great castles", 1, 1),
	("https://images.unsplash.com/photo-1622583529718-b68ded6804d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Three weeks in the US", "United States", "Amazing food and a lot of culture in the States", 1, 2),
	("https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2NvdGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Roadtrip in Scotland", "Scotland", "We saw Nessie", 1, 2), 
	("https://images.unsplash.com/photo-1601928782843-5373177dbfd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Roadtrip in Northern England", "England", "We drove from York to Liverpool", 1, 2),
	("https://images.unsplash.com/photo-1594058573823-d8edf1ad3380?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Fastest roadtrip in Amsterdam", "Netherlands", "After hours trying to get through the bike lanes we got to the countryside", 0, 1),
	("https://images.unsplash.com/photo-1667382988243-6a1e5e85224e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNvdW50cmllcyUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Fastest roadtrip in Sweden", "Sweden", "We ate so many köttbulle (the best meatballs I have ever tried!)", 1, 2),
	("https://images.unsplash.com/photo-1667027234805-68e364df9870?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y291bnRyaWVzJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Coldest trip in France", "France", "We rode through the prettiest mountains!", 1, 2),
	("https://images.unsplash.com/photo-1600256697399-99034be0ef04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "Chillest roadtrip in Norway", "Norway", "We drove for a long long time but it was wort it!", 1, 1),
	("https://images.unsplash.com/photo-1641736205785-30a9dc306bbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "Most peacefull roadtrip in Germany", "Germany", "I did a short roadtrip to see the sunrise", 1, 2),
	("https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVsZ2l1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60", "Belgium was so pretty this fall", "Belgium", "Me and my partner had a great time at this roadtrip!", 1, 1),
	("https://images.unsplash.com/photo-1471623320832-752e8bbf8413?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnJhbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "It was so beautifull", "France", "After driving to these locations I am happy that i can save them to come back again!", 1, 1),
	("https://images.unsplash.com/photo-1668246629236-23299fa1e6a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "In Sweden we connected with nature", "Sweden", "We dove to these stops and we recommend it if you travel with kids", 1, 2),
	("https://images.unsplash.com/photo-1655668559606-9927fbbbb3ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdW50eSUyMHNpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The deer recommended to us to visit these stops", "Ireland", "The wild life was crazy", 1, 1),
	("https://images.unsplash.com/photo-1666684994238-624f2cfccad6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNvdW50eSUyMHNpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "For architecture fanatics", "France", "Me and my partner had a great time at this roadtrip!", 1, 2),
	("https://images.unsplash.com/photo-1602877163453-f1967122abb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNvdW50eSUyMHNpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Roadtrip made for goats", "Uk", "After driving to these locations I am happy that i can save them to come back again!", 1, 1),
	("https://images.unsplash.com/photo-1636632082360-99ce6562731e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGNvdW50eSUyMHNpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "In Berlin we had a very interesting roadtrip", "Germany", "Very artistic and historys stops", 1, 1);





INSERT INTO `stops` (title, address, longitude, latitude, roadtrip_id)
    VALUES ("CodeOp", "Barcelona, Spain", 2.166990, 41.403940, 1),
		   ("Palace", "Zaragoza, Spain", -0.889085, 41.648823, 1),
		   ("Animals and nature", "Teruel, Spain", -1.092689, 40.365397, 1),
		   ("Paella", "Valencia, Spain", -0.352721, 39.446699, 1),
		   ("Amazing Pizza", "Murcia, Spain", -1.143909, 37.986118, 1),
		   ("Coffee Shop", "Seville, Spain", -5.984459, 37.389091, 1),

		   ("Beach", "Algarve, Portugal", -7.9308, 37.0180, 2),
		   ("Marina", "Lagos, Portugal", -8.6730, 37.1028, 2),
           ("Lighthouse", "Sagres, Portugal", -8.9406, 37.0168, 2),
		   ("Market", "Lisbon, Portugal", -9.1393, 38.7223, 2),
           ("Cathedral", "Porto, Portugal", -8.6291, 41.1579, 2),
           ("Casa do Raio", "Braga, Portugal", -8.4265, 41.5454, 2),
           ("Trajano Bridge", "Chaves, Portugal", -7.4706, 41.7411, 2),

		   ("State de France", "Saint-Denis, France", 2.35802, 48.93577, 3),
		   ("Cathédrale Sainte-Croix", "Orleans, France", 1.90861, 47.90273, 3),
		   
		   ("Four Corners", "San Juan County, New Mexico", -109.0452, 36.9990, 6),
           ("Grand Canyon", "Coconino County, AZ", -112.1401, 36.0544, 6),
           ("Sedona Hike", "Sedona, AZ", -111.7610, 34.8697, 6),
           ("Zoe's Hometown", "San Francisco, CA", -122.4194, 37.7749, 6),
           ("Hollywood Sign", "Los Angeles, CA", -118.2437, 34.0522, 6),
           ("Disneyland", "Anaheim, CA", -117.9220, 33.8111, 6),
		   ("Jim's Alma Mater", "Corvallis, Oregon", -123.2794, 44.5638, 6),

		   ("Nature hike", "Allean Forest, Scotland", -3.872422, 56.734922, 7),
		   ("Nessie", "Loch Ericht, Scotland", -4.358743, 56.832008, 7),
		   ("Some hot pizza", "Callander, Scotland", -4.248962, 56.253288, 7),
		   ("Spa", "Bridge of Allan, Scotland", -3.954048, 56.159706, 7),
		   ("Great food and even better company", "Glasgow, Scotland", -4.237976, 55.859948, 7),
		   ("Amazing park", "Clyde Muirshiel Regional Park, Scotland", -4.776712, 55.665047, 7);







INSERT INTO `favorite_roadtrips` (user_id, roadtrip_id) 
VALUES (1 , 1), (1 , 2), (1, 3), (2, 1), (2, 5);