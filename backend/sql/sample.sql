USE blog;

-- Insert dummy users
INSERT INTO Users (name, email, password) VALUES
('Alice', 'alice@example.com', 'hashedpassword1'),
('Bob', 'bob@example.com', 'hashedpassword2');

-- Insert dummy posts
INSERT INTO Posts (title, author, context, cover_image) VALUES
('My First Blog Post', 1, 'This is a blog post by Alice.', 'https://s3.amazonaws.com/mybucket/alice-post1.jpg'),
('Hello from Bob', 2, 'Bob just joined the blog.', 'https://s3.amazonaws.com/mybucket/bob-post1.jpg');
