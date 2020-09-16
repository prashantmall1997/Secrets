This project demonstrates different levels of security for storing passwords to log in user.

Level 1 - Password as Plain Text
- Stores password in DB as plain text
- Matches credential when user logs in to grant access to secrets page

Drawback
- Stores password as plain text on Server


Level 2 - Mongoose Encryption
- Stores encrypted password in DB after ciphering plain password
- Uses a secret which is known only to the admin
- Encrypts user entered password and matches it with encrypted password stored in DB when user logs in

Drawback
- Secret is known to everyone who has access to the app server code
- Admin can decrypt and gain access to used passwords


Level 3 - Hashing Password using MD5
- Stores hashed password in DB
- Hashes user entered password and matches it with hashed password stored in DB when user logs in

Drawback
- Simple passwords can be easily matched using hash table
- Availability of powerful CPU/GPU makes it very easy to create hash tables


Level 4 - Salting and Hashing Password using bcrypt
- Stores salted (Rounds based on saltRounds input) and then hashed password a in DB

Level 5 - Cookies
- Used `passport, passport-local, passport-local-mongoose & express-session`

Level 6 - Social Login
- Implemented Google Social Login
