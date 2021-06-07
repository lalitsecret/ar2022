create database atiqur1;
use atiqur1;

create table users(
	id int auto_increment primary key,
	name varchar(500),
	email varchar(500),
	phone varchar(500),
	password varchar(500),
	country varchar(500),
	city varchar(500),
	state varchar(500),
	pincode varchar(500),
	address varchar(500),
	dt timestamp
);	
