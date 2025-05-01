const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-64px)] px-4">
      <div className="w-full max-w-3xl space-y-12 text-gray-800">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold">Welcome to Blogify</h1>
          <p className="text-lg text-gray-600">
            Your personal space to write, publish, and share ideas. Whether
            you're a student, a professional, or just love writing — Blogify
            helps you create beautiful blogs with ease.
          </p>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📋 About
          </h2>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-semibold">What is Blogify?</span> <br />
            Blogify is a simple, fast, and intuitive blogging platform built
            with Node.js. Designed for learners, content creators, and aspiring
            writers — Blogify lets you focus on writing while we handle the
            rest.
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>📝 Write articles effortlessly</li>
            <li>📷 Upload stunning cover images</li>
            <li>🧑‍💻 Edit, update, and manage your posts</li>
            <li>🚀 Built for speed, simplicity, and modern web standards</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            🧑‍🎓 <span className="font-semibold">For Students:</span>
            Blogify is perfect for learning full-stack development practically —
            by creating real blog posts, managing content, and understanding
            user systems in a fun, hands-on way.
          </p>
        </div>

        {/* Call to Action */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            💡 Ready to Start?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Create your first post on Blogify today. 🔥 Start sharing your ideas
            with the world!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
