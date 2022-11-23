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

ALTER TABLE `stops` ADD CONSTRAINT `stops_fk0` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk1` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

-- SAMPLE DATA 

INSERT INTO `users`(username, email, password, image_url, slogan)
    VALUES ("user1", "user1@gmail.com", "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeFIbf2eX1wOsYywDua3EkaIUcmI_m0To4yA&usqp=CAU", "Hello I am user1"), ("user2", "user2@gmail.com", "$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkWCPzRPgifs1wrH7MlOpjgVOkC4RJnKlkg&usqp=CAU", "Hello I am user2");

INSERT INTO `roadtrips`(image_url, title, countries, description, done, user_id) 
    VALUES ("https://images.unsplash.com/photo-1509840841025-9088ba78a826?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "The best trip of my life", "Spain", "I did a roundtrip in Andalucia...", 1, 1), 
    ("https://images.unsplash.com/photo-1585208798174-6cedd86e019a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnR1Z2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "The scariest trip of my life", "Portugal", "I did a roundtrip from Porto to Lisbon", 1, 1), 
    ("https://images.unsplash.com/photo-1546512970-372b2be5a667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm9ybWFuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The craziest trip of my life", "France", "I did a roundtrip in Normandy", 1, 2), 
    ("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The most romantic trip of my life", "France", "I did a roundtrip from Paris to Marseille", 1, 2),
	("https://images.unsplash.com/photo-1608243027404-bf342660e791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Mosell region in autumn", "Germany", "We visited some great castles", 1, 1),
	("https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3JTIweW9ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Two weeks in New York City", "United States", "Amazing food and a lot of culture in the Big Apple", 1, 2),
	("https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2NvdGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Roadtrip in Scotland", "Scotland", "We saw Nessie", 1, 1), 
	("https://images.unsplash.com/photo-1601928782843-5373177dbfd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Roadtrip in Northern England", "England", "We drove from York to Liverpool", 1, 2),
	("https://images.unsplash.com/photo-1594058573823-d8edf1ad3380?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Fastest roadtrip in Amsterdam", "Netherlands", "After hours trying to get through the bike lanes we got to the countryside", 1, 1),
	("https://images.unsplash.com/photo-1667382988243-6a1e5e85224e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNvdW50cmllcyUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Fastest roadtrip in Sweden", "Sweden", "We ate so many köttbulle (the best meatballs I have ever tried!)", 2, 1),
	("https://images.unsplash.com/photo-1667027234805-68e364df9870?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y291bnRyaWVzJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Coldest trip in France", "France", "We rode through the prettiest mountains!", 3, 1),
	("https://images.unsplash.com/photo-1600256697399-99034be0ef04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "Chillest roadtrip in Norway", "Norway", "We drove for a long long time but it was wort it!", 1, 1),
	("https://images.unsplash.com/photo-1641736205785-30a9dc306bbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "Most peacefull roadtrip in Germany", "Germany", "I did a short roadtrip to see the sunrise", 2, 1),
	("https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVsZ2l1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60", "Belgium was so pretty this fall", "Belgium", "Me and my partner had a great time at this roadtrip!", 1, 1),
	("https://images.unsplash.com/photo-1668246629236-23299fa1e6a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvdW50cmllcyUyMGltYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60", "In Sweden we connected with nature", "Sweden", "We dove to these stops and we recommend it if you travel with kids", 2, 1);




INSERT INTO `stops` (title, address, longitude, latitude, roadtrip_id)
    VALUES ("Sevilla", "Av. la Revoltosa", -5.947020, 37.378690, 1), ("Montequino", "Montequino", -5.922240, 37.343460, 1), ("Carmona", "C. Torre del Oro", -5.640865, 37.472166, 1),
("Lisbon", "Rua da Bempostinha", -9.138937, 38.722127, 2), ("Cruz Quebrada-Dafundo", "Rua Sacadura Cabral", -9.249342, 38.700966, 2);


INSERT INTO `favorite_roadtrips` (user_id, roadtrip_id) 
VALUES (1 , 1), (1 , 2), (1, 3), (2, 1), (2, 5);