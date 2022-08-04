import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useAuthContext } from "../context/auth";
import { LIKE_POST } from "../graphql/mutations";

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (
      user &&
      post.likes.find((like: any) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  const handleLikePost = () => {
    likePost();
  };

  return (
    <div>
      <p className="">{post.likeCount}</p>
      <div onClick={handleLikePost} className={liked ? "button-liked" : ""}>
        <FaThumbsUp />
      </div>
    </div>
  );
};

export default LikeButton;
