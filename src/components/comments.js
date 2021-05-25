import React, { useState } from "react";
import SingleComment from "./singleComment";
import SingleReply from "./singleReply";
import CommentForm from "./commentForm";

const Comments = ({ currentPostSlug, postComments }) => {
    const comments = postComments
        .filter((comment) => !comment.node.reply_to)
        .sort((a, b) => new Date(b.node.date) - new Date(a.node.date));

    const replies = postComments
        .filter((comment) => comment.node.reply_to)
        .sort((a, b) => new Date(b.node.date) - new Date(a.node.date));

    // Used in the comment form
    const [replyToId, setReplyToId] = useState("");
    const [replyToUsername, setReplyToUsername] = useState("");

    return (
        <section className="comments-section">
            <section className="comments-thread">
                <p className="title">Ce que les gens disent</p>
                {comments && comments.length ? (
                    comments.map((comment) => (
                        <div key={comment.node._id} className="comment">
                            <SingleComment
                                comment={comment}
                                setReplyTo={setReplyToId}
                                setReplyToUsername={setReplyToUsername}
                            />

                            {replies.map(
                                (reply) =>
                                    reply.node.reply_to ===
                                        comment.node._id && (
                                        <SingleReply reply={reply} />
                                    )
                            )}
                        </div>
                    ))
                ) : (
                    <p>Personne a commenté :(</p>
                )}
            </section>
            <CommentForm
                replyToId={replyToId}
                setReplyToId={setReplyToId}
                replyToUsername={replyToUsername}
                currentPostSlug={currentPostSlug}
            />
        </section>
    );
};

export default Comments;
