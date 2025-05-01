import db from "../db/db.js";

export interface Post {
  id?: number;
  title: string;
  author: number;
  content: string;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
  name?: string; 
  username?: string; 
}

const PostModel = {
  async createPost(post: Post): Promise<number> {
    const [result] = await db.query(
      "INSERT INTO Posts (title, author, content, cover_image) VALUES (?, ?, ?, ?)",
      [post.title, post.author, post.content, post.cover_image]
    );
    return (result as any).insertId;
  },

  async getPostById(id: number): Promise<Post | null> {
    const [rows] = await db.query(`
      SELECT 
        Posts.*, 
        Users.name, 
        Users.username
      FROM Posts
      JOIN Users ON Posts.author = Users.id
      WHERE Posts.id = ?;
`, [id]);
    const result = rows as Post[];
    return result[0] || null;
  },

  async getAllPosts(): Promise<Post[]> {
    const [rows] = await db.query(`
      SELECT 
        Posts.*, 
        Users.name, 
        Users.username
      FROM Posts
      JOIN Users ON Posts.author = Users.id
      ORDER BY created_at DESC;
      `);
    return rows as Post[];
  },

  async updatePost(post: Partial<Post>): Promise<boolean> {
    const [result]: any = await db.query(
      "UPDATE Posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?",
      [post.title, post.content, post.id]
    );
    return (result && result.affectedRows > 0) || false;
  }, 
  
  async deletePost(id: number): Promise<boolean> {
    const [rows]: any = await db.query("DELETE FROM Posts WHERE id = ?", [id]);
    return rows.affectedRows > 0;
  },
};

export default PostModel;
