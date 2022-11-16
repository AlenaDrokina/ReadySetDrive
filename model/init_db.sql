SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roadtrips;
DROP TABLE IF EXISTS stops;

SET foreign_key_checks = 1;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`slogan` varchar(255) NOT NULL,
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

-- CREATE TABLE `favorite_roadtrips` (
-- 	`user_id` INT NOT NULL,
-- 	`roadtrip_id` INT NOT NULL
-- );

ALTER TABLE `roadtrips` ADD CONSTRAINT `roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `stops` ADD CONSTRAINT `stops_fk0` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

-- ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

-- ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk1` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

-- SAMPLE DATA 

INSERT INTO `users`(username, email, password, image_url, slogan)
    VALUES ("user1", "user1@gmail.com", "123", "test.jpg", "Hello I am user1"), ("user2", "user2@gmail.com", "123", "test.jpg", "Hello I am user2");

INSERT INTO `roadtrips`(image_url, title, countries, description, done, user_id) 
    VALUES ("https://images.unsplash.com/photo-1509840841025-9088ba78a826?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "The best trip of my life", "Spain", "I did a roundtrip in Andalucia...", 1, 1), 
    ("https://images.unsplash.com/photo-1585208798174-6cedd86e019a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnR1Z2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "The scariest trip of my life", "Portugal", "I did a roundtrip from Porto to Lisbon", 1, 1), 
    ("https://images.unsplash.com/photo-1546512970-372b2be5a667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm9ybWFuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The craziest trip of my life", "France", "I did a roundtrip in Normandy", 1, 2), 
    ("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "The most romantic trip of my life", "France", "I did a roundtrip from Paris to Marseille", 1, 2),
	("https://images.unsplash.com/photo-1608243027404-bf342660e791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Mosell region in autumn", "Germany", "We visited some great castles", 1, 1),
	("https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3JTIweW9ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", "Two weeks in New York City", "United States", "Amazing food and a lot of culture in the Big Apple", 1, 2),
	("https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2NvdGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", "Roadtrip in Scotland", "Scotland", "We saw Nessie", 1, 1), 
	("https://images.unsplash.com/photo-1601928782843-5373177dbfd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "Roadtrip in Northern England", "England", "We drove from York to Liverpool", 1, 2);

INSERT INTO `stops` (title, address, longitude, latitude, roadtrip_id)
    VALUES ("Seville", "Av. Test", -5.984459, 37.389091, 1), ("Dos Hermanas", "Test", 37.283180, -5.922240, 1);