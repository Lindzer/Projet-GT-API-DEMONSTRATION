CREATE USER IF NOT EXISTS 'ticket'@'localhost' IDENTIFIED BY 'ticket';
GRANT USAGE ON *.* TO 'ticket'@'localhost';
CREATE DATABASE IF NOT EXISTS `ticket`;
GRANT ALL PRIVILEGES ON `ticket`.* TO 'ticket'@'localhost';
