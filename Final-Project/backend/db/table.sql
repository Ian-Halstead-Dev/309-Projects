CREATE TABLE  users (
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255),
  token VARCHAR(255 ) UNIQUE,
  PRIMARY KEY (email)
)

CREATE TABLE auctions (
	id INT AUTO_INCREMENT,
	title VARCHAR(255),
    description TEXT,
    curr_price INT,
    days_remaining INT,
    owner VARCHAR(255),
    currentWinner VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(email),
    FOREIGN KEY (currentWinner) REFERENCES users(email)
);

CREATE TABLE notifications (
  userEmail VARCHAR(255) NOT NULL,
  id INTEGER AUTO_INCREMENT,
  message TEXT,
  seen BOOLEAN,
  date TIME,
  PRIMARY KEY (id),
  FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE
)