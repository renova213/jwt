const notFound=(req, res) => res.status(502).json({ message: 'Route does not exist' });

export default notFound;