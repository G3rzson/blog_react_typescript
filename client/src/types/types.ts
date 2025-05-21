export type BlogType = {
  _id: string;
  blog: string;
  userId: {
    username: string;
  };
};

export type BlogCardsProps = {
  blogs: BlogType[];
};
