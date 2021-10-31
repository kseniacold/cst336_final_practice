
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `record`;
DROP TABLE IF EXISTS `superhero`;
DROP TABLE IF EXISTS `villain`;

CREATE TABLE IF NOT EXISTS `superhero` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `pob` varchar(25) NOT NULL COMMENT 'Place of Birth',
  `image` varchar(25) NOT NULL COMMENT 'Image Name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `superhero` (`id`, `name`, `firstName`, `lastName`, `pob`, `image`) 
VALUES (1, 'Spiderman', 'Peter', 'Parker', 'New York', 'spiderman'),
(2, 'Superman', 'Clark', 'Kent', 'Krypton', 'superman'),
(3, 'Batman', 'Bruce', 'Wayne', 'Gotham City', 'batman'),
(4, 'Wonderwoman', 'Diana', 'Prince', 'Themyscira', 'wonder_woman'),
(5, 'Iron Man', 'Tony', 'Stark', 'Bulgaria', 'iron_man'),
(6, 'Captain America', 'Steve', 'Rogers', 'New York', 'captain_america'),
(7, 'The Hulk', 'Bruce', 'Banner', 'Ohio', 'hulk'),
(8, 'Superman', 'Clark', 'Kent', 'Krypton', 'superman'),
(9, 'Wonderwoman', 'Diana', 'Prince', 'Themyscira', 'wonder_woman'),
(10, 'The Hulk', 'Bruce', 'Banner', 'Ohio', 'hulk'),
(11, 'Spiderman', 'Peter', 'Parker', 'New York', 'spiderman'),
(12, 'Superman', 'Clark', 'Kent', 'Krypton', 'superman'),
(13, 'Batman', 'Bruce', 'Wayne', 'Gotham City', 'batman'),
(14, 'Iron Man', 'Tony', 'Stark', 'Bulgaria', 'iron_man'),
(15, 'Captain America', 'Steve', 'Rogers', 'New York', 'captain_america');


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE TABLE IF NOT EXISTS `villain` (
  `villainId` int(11) NOT NULL AUTO_INCREMENT,
  `villainName` varchar(50) NOT NULL,
  `villainImage` varchar(500) NOT NULL,
  `superheroId` tinyint(4) NOT NULL,
  PRIMARY KEY (`villainId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19;


INSERT INTO `villain` (`villainId`, `villainName`, `villainImage`, `superheroId`) 
VALUES (1, 'Dr. Octopus', ' http://www.marveldirectory.com/pictures/individuals/d_1d/droctopus.jpg', 1),
(2, 'Vulture', 'http://www.marveldirectory.com/pictures/individuals/v_1d/vulture.gif', 1),
(3, 'Mysterio', 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150608-27674-m803ql_f3079fa3.png', 1),
(4, 'Scorpion', 'https://vignette2.wikia.nocookie.net/villains/images/f/f9/Scorpion.gif', 1),
(5, 'Lex Luthor', 'http://vignette2.wikia.nocookie.net/superman/images/e/ec/Lexluthor-superfriends.jpg', 2),
(6, 'Bizarro', 'http://www.dccomics.com/sites/default/files/styles/character_thumb_160x160/public/CharThumb_215x215_bizarro_52ab94f8080358.43158303.jpg', 2),
(7, 'Joker', 'https://vignette2.wikia.nocookie.net/batman/images/d/da/TheJoker_01.jpg', 3),
(8, 'Two-face', 'https://static5.comicvine.com/uploads/original/5/58953/5484072-batman66twoface.png', 3),
(9, 'Penguin', 'https://vignette4.wikia.nocookie.net/villains/images/e/e4/PenguinDCAU.gif', 3),
(10, 'Riddler', 'http://vignette4.wikia.nocookie.net/batman/images/c/cb/The_Riddler_01.jpg', 3),
(11, 'Dr. Psycho', 'https://vignette3.wikia.nocookie.net/villains/images/4/4c/Drpsycho.jpg', 4),
(12, 'Hawkeye', 'https://en.wikipedia.org/wiki/Hawkeye_(comics)#/media/File:Hawkeye_(Clinton_Barton).png', 5),
(13, 'Brothers Grimm', 'http://www.marveldirectory.com/pictures/individuals/b_1d/brothersgrimm.gif', 5),
(14, 'Baron von Strucker', 'http://vignette3.wikia.nocookie.net/villains/images/9/9f/Wolfgang_von_Strucker_%28Earth-616%29.jpg', 6),
(15, 'King Cobra', 'http://img2.wikia.nocookie.net/__cb20141001112758/marvel/fr/images/thumb/d/db/Kingcobra.jpg/130px-0%2C221%2C5%2C201-Kingcobra.jpg', 6),
(16, 'Red Skull', 'http://www.superherodb.com/pictures/portraits/red-skull.jpg', 6),
(17, 'Abomination', 'https://vignette1.wikia.nocookie.net/avengersalliance/images/7/72/Abomination.png', 7),
(18, 'Red Hulk', 'http://vignette1.wikia.nocookie.net/avengersalliance/images/5/56/Red_Hulk-Modern.png', 7);

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE TABLE IF NOT EXISTS `record` (
  `recordId` int(11) NOT NULL AUTO_INCREMENT,
  `superheroId` int(11) NOT NULL,
  `value` tinyint(1) NOT NULL,
  PRIMARY KEY (`recordId`),
  FOREIGN KEY (`superheroId`)
    REFERENCES superhero(id) 
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


